import type {APIRoute} from "astro";
import {match} from "ts-pattern";
import {ImageResponse} from "@vercel/og";
import {createImageElement} from "@ui/react/opengraph/og_elements.tsx";





export const config = {
    runtime: 'edge',
}

type PageParameters = {
    kind: 'page'
    title: string
    description: string
}

type PostParameters = {
    kind: 'post'
    title: string
    coverUrl: string
}

type RequestParameters = PageParameters | PostParameters | { kind: undefined }

const getFont = async (name: string) => {
    const res = await fetch(`https://alexwhiteside.dev/fonts/${name}.ttf`)
    return res.arrayBuffer()
}
export const GET: APIRoute<RequestParameters> = async ({request, params}) => {
    //const params = extractParametersFromRequest(request)

    const display = match(params)
        .with({kind: 'page'}, (page) => {
            return {
                title: page.title,
                image: undefined,
                description: page.description,
            }
        })
        .with({kind: 'post'}, (post) => {
            return {
                title: post.title,
                image: post.coverUrl,
                description: '',
            }
        })
        .otherwise(() => {
            return {
                title: 'Alex Whiteside',
                image: undefined,
                description: '',
            }
        })
    return new ImageResponse(
        createImageElement(display),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'concourse',
                    data: await getFont('concourse-regular'),
                    style: 'normal',
                },
                {
                    name: 'concourse-bold',
                    data: await getFont('concourse-medium'),
                    style: 'normal',
                },
            ],
        },
    )
}