
import { describe, expect, it } from 'vitest'
import type { Repository } from './types'
import { createTable } from './createTable'
describe('extract', () => {
  it('should create a table', async () => {
    const repos = new Array<Repository>()
    const table = await createTable()
  },{timeout: 100000000})
})