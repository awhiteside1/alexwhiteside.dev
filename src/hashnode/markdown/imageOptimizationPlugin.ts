import { optimizeImage } from '@ui/utils/optimizeImage'
import type { Image } from 'mdast'
import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

export const optimizeImagePlugin = () => {
    return (tree: Root) => {
      visit(tree, 'image', (node: Image) => {
        if (node.url) {
          node.url = optimizeImage(node.url, 'thumb')
        }
      })
    }
  }