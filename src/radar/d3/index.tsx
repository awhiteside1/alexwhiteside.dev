import {RadarChart} from './radar.mjs'
import {type Ref, useCallback, useRef} from "react";
import {data} from "./data.ts";
import {radarChartOptions} from "./options.ts";



export const Radar = ()=>{
   const callbackRef= useCallback((ref:  HTMLDivElement|null)=>{
       if(ref) {
           RadarChart(ref?.id, data, radarChartOptions)
       }
    },[])

    return <><script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"/><div ref={callbackRef}/></>

}