import { cn } from '@lib/utils'
import { optimizeImage } from '@ui/utils/optimizeImage'
import type { Image } from 'mdast'
import type { Root } from 'mdast'
import { replace, set } from 'radash'
import { visit } from 'unist-util-visit'
import { CONTINUE, visitParents } from 'unist-util-visit-parents'

export const optimizeImagePlugin = () => {
	return (tree: Root) => {
		visit(tree, 'image', (node: Image) => {
			if (node.url) {
				// biome-ignore lint: <explanation>
				node = set(node, 'url', optimizeImage(node.url, 'large'))
				try {
					const meta = JSON.parse(node.alt || '{}')
					if (meta.style) {
						// biome-ignore lint: <explanation>
						node = set(node, 'data.hProperties.style', meta.style)
					}
					const className = cn(['max-w-full', meta.class])
					// biome-ignore lint: <explanation>
					node = set(node, 'data.hProperties.className', className)
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
