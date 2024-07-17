
 import memfs from 'memfs';
 import fs from 'node:fs/promises'
import path from 'node:path'
import {createApp, eventHandler, setHeader, appendCorsHeaders} from 'h3'
import {objectify} from 'radash'
// import {getDirname} from './dir'
// const __dirname = getDirname(import.meta.url)
// import {toSnapshotSync} from 'memfs/lib/snapshot'

// // function readGitIgnore(){
// // const file = path.join(process.cwd(), '.gitignore')
// //    const contents =  fs.readFileSync(file)
// //    const string = Buffer.from(contents).toString('utf-8')
// //    return string.split('\n')

// // }

// // const ignores = readGitIgnore()
// // Function to recursively read directory contents and populate memfs volume
async function readDirectoryContents(dir:string, root = '/') {
    const items =  await fs.readdir(dir);
    for (const item of items) {
        if(item.startsWith(".")) continue
        if(item.includes("node_modules")) continue
        const itemPath = path.join(dir, item);
        const stats = await fs.stat(itemPath);
        const memPath = path.join(root, item);
    
        if (stats.isDirectory()) {
            memfs.fs.mkdirSync(memPath);
         await readDirectoryContents(itemPath, memPath);
        } else {
          const fileContent = await fs.readFile(itemPath);
          memfs.fs.writeFileSync(memPath, fileContent);
        }
      }
  }


// // Initialize an in-memory file system


//   const rootDir = process.cwd(); // Specify the root directory
//   readDirectoryContents(rootDir);
  
//   memfs.vol.
// const json = memfs.vol.toJSON()

 
//   
  


import { snapshot } from '@webcontainer/snapshot';
const rootDir = path.join(process.cwd(), 'src');

readDirectoryContents(process.cwd())

export const app = createApp()
app.use('/',eventHandler(evt=>appendCorsHeaders(evt, {
    origin: '*',
    preflight: {
     statusCode: 204,
    },
 methods: '*',
})))
app.use('/snapshot', eventHandler(async (evt)=>{
    setHeader(evt, 'content-type', 'application/octet-stream')
    return snapshot(rootDir)
}))
app.use('/root', eventHandler(async(evt) => {

    const sources = memfs.vol.toJSON()
    return sources
    //return {...rootFiles, ...sources}


}))


async function readProjectFiles (){
const root = process.cwd()
    const files = await fs.readdir(root, {withFileTypes:true})
    const realFiles = await Promise.all(files.filter(file=> file.isFile()).map(async(file)=> ({name: file.name, contents: (await fs.readFile(path.join(file.parentPath, file.name))).toString('utf-8') } )))
    const data =objectify(realFiles, file=> file.name, file =>file.contents)
    return data
}