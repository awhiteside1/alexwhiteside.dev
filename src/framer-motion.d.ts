import type React from 'react'

declare module 'framer-motion' {
	export interface HTMLMotionProps {
		className?: string
		children?: React.ReactNode
	}
}

declare global {
	interface Window {
		initScrollTimeline: () => void
	}
}
