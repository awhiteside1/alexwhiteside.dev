import type { FilesMap } from '@codesandbox/nodebox';
import type {FileSystemTree} from '@webcontainer/api'


// const snapshotResponse = await fetch('http://localhost:3000/snapshot');
// const snapshot = await snapshotResponse.arrayBuffer();

const rootFiles = await fetch('http://localhost:3000/root');
const root = await rootFiles.json() as FilesMap


export {root}