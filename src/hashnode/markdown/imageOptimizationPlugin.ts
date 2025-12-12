import { cn } from '@lib/utils'
import { optimizeImage } from '@ui/utils/optimizeImage'
import type { ClassValue } from 'clsx'
import type { Properties } from 'hast'
import type { Image, Root, RootContent } from 'mdast'
import { replace } from 'radash'
import { visit } from 'unist-util-visit'
import { CONTINUE } from 'unist-util-visit-parents'

type HProperties = Properties & Record<string, unknown>

type ImageData = (Image['data'] & Record<string, unknown>) & { hProperties?: HProperties }

type ImageMeta = {
        class?: ClassValue
        style?: HProperties['style']
} & Record<string, unknown>

const isFloatImage = (node: RootContent): node is Image & { data?: ImageData } =>
        node.type === 'image' && hasFloatClass(node.data?.hProperties?.className)

const parseImageMeta = (alt?: string | null): ImageMeta => {
        if (!alt) return {}

        try {
                const parsed = JSON.parse(alt) as ImageMeta
                return parsed && typeof parsed === 'object' ? parsed : {}
        } catch (_error) {
                return {}
        }
}

const hasFloatClass = (className?: HProperties['className']) => {
        if (!className) return false

        const classes = Array.isArray(className) ? className : [className]
        return classes.some((value) => value?.toString().includes('float'))
}

export const optimizeImagePlugin = () => {
        return (tree: Root) => {
                visit<Root, 'image'>(tree, 'image', (node) => {
                        const imageNode = node as Image & { data?: ImageData }

                        if (!imageNode.url) return

                        imageNode.url = optimizeImage(imageNode.url, 'large')

                        const meta = parseImageMeta(imageNode.alt)
                        const { class: metaClass, style, ...restMeta } = meta

                        const data = (imageNode.data ??= {} as ImageData)
                        const existingProperties = (data.hProperties ?? {}) as HProperties
                        const className = cn(['max-w-full', metaClass])

                        data.hProperties = {
                                ...existingProperties,
                                ...restMeta,
                                className,
                                ...(style !== undefined ? { style } : {}),
                        }
                })
        }
}

export const hoistImagesOutOfParagraphs = () => {
        return (tree: Root) => {
                visit<Root, 'paragraph'>(tree, 'paragraph', (paragraph, index, parent) => {
                        if (!parent || index == null) return CONTINUE

                        const floatImageIndex = paragraph.children.findIndex(isFloatImage)
                        if (floatImageIndex === -1) return CONTINUE

                        const imageNode = paragraph.children[floatImageIndex]
                        if (!imageNode || paragraph.children.length !== 1) return CONTINUE

                        const previousSiblingIndex = index - 1
                        if (previousSiblingIndex < 0) return CONTINUE

                        const previousSibling = parent.children?.[previousSiblingIndex]
                        if (!previousSibling) return CONTINUE

                        parent.children = replace(
                                parent.children ?? [],
                                imageNode as RootContent,
                                (item: RootContent) => item === previousSibling,
                        )

                        parent.children = replace(
                                parent.children,
                                previousSibling,
                                (item: RootContent) => item === paragraph,
                        )

                        return CONTINUE
                })
        }
}
