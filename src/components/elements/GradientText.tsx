import type { PropsWithChildren, ReactNode } from 'react'
import type { HTMLTag } from 'astro/types'
import { cn } from '../../utils/cn.tsx'

const gradients = {
	blue: 'from-indigo-500 via-sky-500 to-emerald-500',
	orange: 'from-pink-500 via-red-500 to-orange-500',
}

interface Props {
	as?: 'p' | 'h1' | 'h2'
	size?: number
	color?: keyof typeof gradients
}

export const GradientText = ({
	children,
	size=2,
	color = 'blue',
}: PropsWithChildren<Props>) => {
	return (
		<span
			className={cn(
				`text-${size}xl font-bold bg-gradient-to-r text-transparent bg-clip-text animate-gradient bg-300%`,
				gradients[color],
			)}
		>
			{children}
		</span>
	)
}
