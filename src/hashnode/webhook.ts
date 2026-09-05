import { createHmac, timingSafeEqual } from 'node:crypto'

const SIGNATURE_VERSION = 'v1'
const DEFAULT_TOLERANCE_SECONDS = 30

type Parsed = { timestamp: number; signature: string }

/**
 * Hashnode sends `t=<ms epoch>,v1=<hex hmac>`, the same shape Stripe uses.
 */
const parseHeader = (header: string): Parsed | undefined => {
	const parts = header.split(',').map((part) => part.trim())
	const timestamp = parts
		.find((part) => part.startsWith('t='))
		?.slice('t='.length)
	const signature = parts
		.find((part) => part.startsWith(`${SIGNATURE_VERSION}=`))
		?.slice(SIGNATURE_VERSION.length + 1)

	if (!timestamp || !signature) return undefined

	const parsedTimestamp = Number.parseInt(timestamp, 10)
	if (!Number.isFinite(parsedTimestamp)) return undefined

	return { timestamp: parsedTimestamp, signature }
}

const sign = (timestamp: number, body: string, secret: string) =>
	createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex')

const equals = (a: string, b: string) => {
	const left = Buffer.from(a)
	const right = Buffer.from(b)
	// timingSafeEqual throws on length mismatch, which is itself a failed compare.
	return left.length === right.length && timingSafeEqual(left, right)
}

export type VerifyResult = { valid: true } | { valid: false; reason: string }

type VerifyOptions = {
	/** Raw request body, exactly as received - re-serialising can change bytes. */
	body: string
	/** Contents of the x-hashnode-signature header. */
	header: string | null
	secret: string
	/** Replay window. 0 disables the timestamp check. */
	toleranceSeconds?: number
	/** Wall clock in ms; injectable so tests are not time-dependent. */
	now?: number
}

export const verifyWebhookSignature = ({
	body,
	header,
	secret,
	toleranceSeconds = DEFAULT_TOLERANCE_SECONDS,
	now = Date.now(),
}: VerifyOptions): VerifyResult => {
	if (!secret) return { valid: false, reason: 'No webhook secret configured' }
	if (!header) return { valid: false, reason: 'Missing signature header' }

	const parsed = parseHeader(header)
	if (!parsed) return { valid: false, reason: 'Malformed signature header' }

	const { timestamp, signature } = parsed

	// Hashnode's own sample signs `JSON.stringify(parsedBody)`. That matches the
	// raw bytes for the compact JSON they send, but not if they ever pad it, so
	// accept either rather than reject a genuine delivery over whitespace.
	const candidates = [body]
	try {
		candidates.push(JSON.stringify(JSON.parse(body)))
	} catch {
		// A non-JSON body only ever has one form to check.
	}

	const matches = candidates.some((candidate) =>
		equals(sign(timestamp, candidate, secret), signature),
	)
	if (!matches) return { valid: false, reason: 'Signature mismatch' }

	if (toleranceSeconds > 0) {
		const driftSeconds = Math.abs(now - timestamp) / 1000
		if (driftSeconds > toleranceSeconds) {
			return { valid: false, reason: 'Signature timestamp outside tolerance' }
		}
	}

	return { valid: true }
}
