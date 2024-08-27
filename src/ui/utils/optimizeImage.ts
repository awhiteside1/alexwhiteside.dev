const optimizePresets = {
	thumb: { width: '200', quality: '70', format: 'avif' },
	small: { width: '400', quality: '70', format: 'avif' },
	med: { width: '800', quality: '70', format: 'avif' },
	large: { width: '1200', quality: '80', format: 'avif' },
}

type Preset = { width: string; quality: string; format: string }

const generateOptionsString = (options: Preset) => {
	return new URLSearchParams(options).toString().replaceAll('&', ',')
}

const isProd = () =>
	process.env.VERCEL !== undefined && process.env.VERCEL_ENV === 'production'

export const optimizeImage = (
	url: string,
	preset: keyof typeof optimizePresets,
) => {
	try {
		const Url = new URL(url)
		if (!isProd()) {
			//Has no functionality, just makes debugging easier. I don't love it. But I don't like hosting another service more.
			Url.searchParams.set('local', 'true')
			return Url.toString()
		}
		const options = optimizePresets[preset]
		const optionsString = generateOptionsString(options)
		return `https://alexwhiteside.dev/cdn-cgi/image/${optionsString}/${url}`
	} catch (err) {
		return url
	}
}
