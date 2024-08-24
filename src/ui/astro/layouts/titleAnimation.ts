import { animate, scroll } from 'motion'

export const setupScrollAnimation = () => {
	if (document.querySelectorAll('.scroll-scale').length > 0) {
		scroll(
			animate('.scroll-scale', {
				fontSize: [
					'min(max(calc(4vw + 1em), 2.8rem), 4rem)',
					'var(--max-font-size)',
				],
			}),
			{
				offset: [0, '200px'],
			},
		)
	}

	scroll(
		animate('.scroll-bg', {
			backgroundColor: ['transparent', 'var(--color-base)'],
			borderBottom: ['1px solid', '1px solid'],
			borderBottomColor: ['transparent', 'var(--color-page-contrast)'],
		}),
		{
			offset: ['80px', '150px'],
		},
	)
}
