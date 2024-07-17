import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export function getDirname(metaUrl:string) {
  return dirname(fileURLToPath(metaUrl));
}
