import { describe, expect, test } from 'vitest'
import { createHmac } from 'node:crypto'
import { verifyWebhookSignature } from './webhook'

const secret = 'whsec_test'
const body = JSON.stringify({ data: { post: { id: 'abc' } } })
const now = 1_700_000_000_000

const header = (timestamp: number, payload = body, key = secret) =>
	`t=${timestamp},v1=${createHmac('sha256', key)
		.update(`${timestamp}.${payload}`)
		.digest('hex')}`

describe('verifyWebhookSignature', () => {
	test('accepts a signature Hashnode produced', () => {
		expect(
			verifyWebhookSignature({ body, header: header(now), secret, now }),
		).toEqual({ valid: true })
	})

	test('rejects a signature made with a different secret', () => {
		const result = verifyWebhookSignature({
			body,
			header: header(now, body, 'whsec_wrong'),
			secret,
			now,
		})
		expect(result.valid).toBe(false)
	})

	test('rejects a body altered after signing', () => {
		const result = verifyWebhookSignature({
			body: body.replace('abc', 'xyz'),
			header: header(now),
			secret,
			now,
		})
		expect(result.valid).toBe(false)
	})

	test('rejects a replay outside the tolerance window', () => {
		const stale = now - 120_000
		const result = verifyWebhookSignature({
			body,
			header: header(stale),
			secret,
			now,
		})
		expect(result).toEqual({
			valid: false,
			reason: 'Signature timestamp outside tolerance',
		})
	})

	test('accepts a replay when tolerance is disabled', () => {
		const stale = now - 120_000
		expect(
			verifyWebhookSignature({
				body,
				header: header(stale),
				secret,
				now,
				toleranceSeconds: 0,
			}),
		).toEqual({ valid: true })
	})

	test('rejects a missing or malformed header', () => {
		expect(verifyWebhookSignature({ body, header: null, secret, now })).toEqual(
			{
				valid: false,
				reason: 'Missing signature header',
			},
		)
		expect(
			verifyWebhookSignature({ body, header: 'v1=deadbeef', secret, now }),
		).toEqual({ valid: false, reason: 'Malformed signature header' })
	})

	test('accepts the re-serialised form Hashnode documents', () => {
		const compact = JSON.stringify(JSON.parse(body))
		const spaced = JSON.stringify(JSON.parse(body), null, 2)
		expect(
			verifyWebhookSignature({
				body: spaced,
				header: header(now, compact),
				secret,
				now,
			}),
		).toEqual({ valid: true })
	})

	test('refuses to validate when no secret is configured', () => {
		expect(
			verifyWebhookSignature({ body, header: header(now), secret: '', now }),
		).toEqual({ valid: false, reason: 'No webhook secret configured' })
	})
})
