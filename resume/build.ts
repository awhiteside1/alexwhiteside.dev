import { createCompiler } from "typstkit";
import {doc} from "./resume";




export const getPdfContents =async ()=>{
	const compiler = await createCompiler()
	const pdf = await compiler.pdf(doc.toTypst())
	return pdf
}
