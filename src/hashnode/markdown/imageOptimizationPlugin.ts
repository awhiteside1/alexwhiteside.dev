import { cn } from '@lib/utils'
import { optimizeImage } from '@ui/utils/optimizeImage'
import type { Image, Root } from 'mdast'
import { replace } from 'radash'
import { visit } from 'unist-util-visit'
import { CONTINUE, visitParents } from 'unist-util-visit-parents'

export const optimizeImagePlugin = () => {
	return (tree: Root) => {
		visit(tree, 'image', (node: Image) => {
			if (node.url) {
				node.url = optimizeImage(node.url, 'large')
				try {
					if (node.data) {
						const meta = JSON.parse(node.alt || '{}')
						const className = cn(['max-w-full', meta.class])

						if (meta.style) {
							Object.assign(node.data, {
								hProperties: {
									...node.data.hProperties,
									className,
									style: meta.style,
								},
							})
						}
					}
				} catch (e) {
					console.log(e)
				}
			}
		})
	}
}

export const hoistImagesOutOfParagraphs = () => {
	return (tree: Root) => {
		visitParents(tree, 'image', (node, parents) => {
			try {
				if (parents.length < 2) return CONTINUE
				if (node.data?.hProperties?.className?.toString().includes('float')) {
					const parent = parents.pop()
					const grandParent = parents.pop()
					if (parent && grandParent && parent.type === 'paragraph') {
						const parentIndex = grandParent.children.findIndex(
							(item) => item === parent,
						)
						const previousNode = grandParent.children[parentIndex - 1]
						grandParent.children = replace(
							grandParent.children,
							node,
							(item) => item === previousNode,
						)
						grandParent.children = replace(
							grandParent.children,
							previousNode,
							(item) => item === parent,
						)
					}
				}
			} catch (e) {}
		})
	}
}
