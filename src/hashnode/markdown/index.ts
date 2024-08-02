import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkGfm from 'remark-gfm'
import {unified} from 'unified'
import { hashnodeImageFixer } from './hashnodeImagePlugin'
import { hoistImagesOutOfParagraphs, optimizeImagePlugin } from './imageOptimizationPlugin'

export const chain = unified()
  .use(remarkParse)
  .use(hashnodeImageFixer)
  .use(remarkGfm)
  .use(optimizeImagePlugin)
  .use(hoistImagesOutOfParagraphs)
  .use(remarkRehype)
  .use(remarkUnwrapImages)
  .use(rehypeStringify)