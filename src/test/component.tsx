import { WebContainer } from '@webcontainer/api';
import { snapshot, root } from './files';
import { useEffect, useState } from 'react';




const useWebContainer = ()=>{

    const [webcontainer, setWebContainer]=useState<WebContainer>()
    const [iframeUrl, setIframeUrl]=useState<string>()
    useEffect(()=>{
         WebContainer.boot().then(webcontainer=>{
            setWebContainer(webcontainer)
            webcontainer.mount(root).then(()=>{
                webcontainer.fs.mkdir('src').then(()=>{
              webcontainer.mount(snapshot, {mountPoint:'src'}).then(()=>{
        

                installDependencies(webcontainer).then(()=>{
                    webcontainer.spawn('npm', ['run', 'start']).then((output)=>{
                       output.output.pipeTo(new WritableStream({
                        write(data) {
                          console.log(data);
                        }
                      }))
                      webcontainer.on('server-ready', (port, url) => {
                        setIframeUrl(url);
                      })
                    
                    })
                })})
              })
            })
         })
    },[])


    if(iframeUrl) return <iframe width="100%" height="100%" src={iframeUrl} title="some iframe" />
    
    return <p>Loading</p>


}

export const WebContainerPreview = ()=>{

const iframe = useWebContainer()

return <>{iframe}</>


}


async function installDependencies(webcontainerInstance: WebContainer) {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }))
  // Wait for install command to exit
  return installProcess.exit;
}


