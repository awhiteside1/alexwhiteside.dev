import {  root } from './files';
import { useEffect, useState } from 'react';
import { Nodebox } from "@codesandbox/nodebox";


const setupNodebox = async ()=>{
    const iframeEditor = document.createElement('iframe')
    document.body.appendChild(iframeEditor)
    const emulator = new Nodebox({
        iframe: iframeEditor
      });
    await emulator.connect();
    await emulator.fs.init(root)

    const shell = emulator.shell.create();
    shell.stdout.on('data', (data) => {
        console.log('Output:', data);
      });
    await shell.runCommand("npm", ["install"]);
    await new Promise( resolve=> shell.on('exit', (code)=>  resolve(code)))
    const newShell = emulator.shell.create();
    newShell.stdout.on('data', (data) => {
        console.log('Output:', data);
      });
    const serverCommand = await newShell.runCommand("npm", ["run","dev"]);
    const { url } = await emulator.preview.getByShellId(serverCommand.id);
 
// Preview Iframe to see output of code
const previewIframe = document.getElementById("nodebox-preview-iframe");
previewIframe?.setAttribute("src", url);

}



const useNodebox=()=>{


    useEffect(()=>{
        setupNodebox().catch(err=>console.error(err))


    },[])

}


// const useWebContainer = ()=>{

//     const [webcontainer, setWebContainer]=useState<WebContainer>()
//     const [iframeUrl, setIframeUrl]=useState<string>()
//     useEffect(()=>{
//          WebContainer.boot().then(webcontainer=>{
//             setWebContainer(webcontainer)
//             webcontainer.mount(root).then(()=>{
//                 webcontainer.fs.mkdir('src').then(()=>{
//               webcontainer.mount(snapshot, {mountPoint:'src'}).then(()=>{
        

//                 installDependencies(webcontainer).then(()=>{
//                     webcontainer.spawn('npm', ['run', 'start']).then((output)=>{
//                        output.output.pipeTo(new WritableStream({
//                         write(data) {
//                           console.log(data);
//                         }
//                       }))
//                       webcontainer.on('server-ready', (port, url) => {
//                         setIframeUrl(url);
//                       })
                    
//                     })
//                 })})
//               })
//             })
//          })
//     },[])


//     if(iframeUrl) return <iframe width="100%" height="100%" src={iframeUrl} title="some iframe" />
    
//     return <p>Loading</p>


// }

export const WebContainerPreview = ()=>{

 useNodebox()

return <iframe id='nodebox-preview-iframe' title='fddafsd'/>


}


// async function installDependencies(webcontainerInstance: WebContainer) {
//   // Install dependencies
//   const installProcess = await webcontainerInstance.spawn('npm', ['install']);
//   installProcess.output.pipeTo(new WritableStream({
//     write(data) {
//       console.log(data);
//     }
//   }))
//   // Wait for install command to exit
//   return installProcess.exit;
// }


