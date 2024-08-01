import {visit} from 'unist-util-visit'
import type { Root, Paragraph } from 'mdast'

// Custom plugin to handle aligned images
export const hashnodeImageFixer = () => (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph) => {
      if (node.children && node.children.length === 3) {
        const [first, second, third] = node.children;
        if (
          first.type === 'text' && 
          second.type === 'link' && 
          third.type === 'text' &&
          first.value.startsWith('![') &&
          third.value.trim().startsWith('align=')
        ) {
          const altText = first.value.slice(2, -1);
          const url = second.url;
          const align = third.value.match(/align="([^"]+)"/)?.[1] || '';
  
          node.children = [{
            type: 'image',
            url,
            alt: altText,
            title: null,
            data: { hProperties: { align } }
          }];
        }
      }
    });
  };
