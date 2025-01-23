import defu from "defu";
import {Eta} from 'eta'
import path from 'node:path';
import type {Resume} from "./types";


export const createEta = () => {
    const viewsDir = path.join(import.meta.dirname, "fragments");
    const eta = new Eta({views: viewsDir, autoEscape: false});
    return eta;
}


export class ResumeBuilder {

    private content: Partial<Resume> = {}

    private eta = createEta();


    set<const K extends keyof Resume>(key: K, value: Resume[K]) {
        this.content = defu({[key]: value}, this.content)
        return this;
    }

    add<const K extends keyof Omit<Resume, 'contact'>>(key: K, value: Resume[K][number]) {
        this.content = defu({[key]: [value]}, this.content)
        return this;
    }


    build() {
        return this.eta.render('test.eta', this.content)

    }
}