import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import { unified } from 'unified'
import { hashnodeImageFixer } from './hashnodeImagePlugin'
import {
	hoistImagesOutOfParagraphs,
	optimizeImagePlugin,
} from './imageOptimizationPlugin'

export const chain = unified()
	.use(remarkParse)
	.use(hashnodeImageFixer)
	.use(remarkGfm)
	.use(optimizeImagePlugin)
	.use(hoistImagesOutOfParagraphs)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeUnwrapImages)
	.use(rehypeRaw)
	.use(rehypeStringify)
