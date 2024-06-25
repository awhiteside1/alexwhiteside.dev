import type {Meta, StoryObj} from '@storybook/preact'
import {Radar} from "./d3";


export default {

    component: Radar

} as Meta<any>



export const Sample:StoryObj = {
    render:()=> <Radar/>

}