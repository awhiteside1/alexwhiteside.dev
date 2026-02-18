import { createCompiler } from "@awhiteside1/typstkit";
import {doc} from "./resume";




export const getPdfContents =async ()=>{
	const compiler = await createCompiler()
	const pdf = await compiler.pdf(doc.toTypst())
	return pdf
}
