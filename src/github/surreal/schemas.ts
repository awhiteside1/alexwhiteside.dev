import {surql, type Surreal} from 'surrealdb.js'
import {repositoryDefinition, resourceDefinition, textDefinition} from "./surql/schema";
import {get} from "radash";
export const initSchema = async (db: Surreal) => {

    const info =(await db.query(surql`INFO for DB`))[0]
    if(!get(info,"tables.repository")){
        await db.query(repositoryDefinition)
    }
    if(!get(info,"tables.text")){
        await db.query(textDefinition)
    }
    if(!get(info,"tables.resource")){
        await db.query(resourceDefinition)
    }
}
