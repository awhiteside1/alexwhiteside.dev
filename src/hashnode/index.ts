import {client} from "./client.ts";
import {getPost, getPosts} from './queries/getPosts'

export const Hashnode ={

    getPosts: getPosts.bind(client),
    getPost: getPost.bind(client)


} as const
