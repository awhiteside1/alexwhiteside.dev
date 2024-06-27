import type {Meta, StoryObj} from "@storybook/react";
import {StickyScroll} from "./scroll-reveal";

export default {
    component: StickyScroll

} as Meta<typeof StickyScroll>


export const Example:StoryObj<typeof StickyScroll> = {

    args:{
        content: [{
            title: "blog",
            description: "Aw, yo-ho-ho.",
            content: <img src="https://picsum.photos/200" alt="dsfhsjk"/>
        },{
            title: "another blog",
            description: "Mystery, faith, and friendship. .",
            content: <img src="https://picsum.photos/500" alt="dsfhsjk"/>
        }]
    }

}