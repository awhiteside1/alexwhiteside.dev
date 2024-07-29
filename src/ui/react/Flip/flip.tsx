'use client'
import { cn } from '@ui/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'

// const list = {
// 	visible: {
// 		opacity: 1,
// 		transition: {
// 			when: 'beforeChildren',
// 			staggerChildren: 0.3,
// 		},
// 	},
// 	hidden: {
// 		opacity: 0,
// 		transition: {
// 			when: 'afterChildren',
// 		},
// 	},
// }

const start = performance.now()
export const FlipWords = ({
    words,
    duration = 4000,
    className,
}: {
    words: string[]
    duration?: number
    className?: string
}) => {

    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), '')
    const [currentWord, setCurrentWord] = useState(words[0])
    const [isAnimating, setIsAnimating] = useState<boolean>(false)

    // thanks for the fix Julian - https://github.com/Julian-AT
    const startAnimation = useCallback(() => {
        const word = words[words.indexOf(currentWord) + 1] || words[0]
        setCurrentWord(word)
        setIsAnimating(true)
    }, [currentWord, words])

    useEffect(() => {
        if (!isAnimating)
            setTimeout(() => {
                console.log(
                    `[${performance.now() - start}] Next Animation ${currentWord} at `
                )
                startAnimation()
            }, duration)
    }, [isAnimating, duration, startAnimation, currentWord])

    return (
        <div className="inline-block">
            <div className='px-2 h-0 opacity-0 invisible'>{longestWord}</div>
        <AnimatePresence
            onExitComplete={() => {
                setIsAnimating(false)
            }}
        >
            <motion.span
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                }}
                exit={{
                    opacity: 0,
                    y: -40,
                    x: 40,
                    filter: 'blur(8px)',
                    scale: 2,
                    position: 'absolute',
                }}
                className={cn(
                    'z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100',
                    className
                )}
                key={currentWord}
            >
                {[...currentWord].map((letter, index) => (
                    <motion.span
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={currentWord + index}
                        initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                            delay: index * 0.08,
                            duration: 0.4,
                        }}
                        className="inline-block whitespace-pre"
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.span>
        </AnimatePresence>
        </div>
    )
}
