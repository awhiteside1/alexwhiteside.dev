/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode, $tada } from 'gql.tada';

declare module 'gql.tada' {
 interface setupCache {
    "\n    query getPost($slug: String!) {\n        publication(host: \"alexwhiteside.dev/blog\") {\n            post(slug: $slug) {\n                slug\n                publishedAt\n                readTimeInMinutes\n                canonicalUrl\n                title\n                subtitle\n                brief\n                tags {\n                    name\n                    slug\n                }\n                url\n                reactionCount\n                content {\n                    html\n                }\n                features {\n                    tableOfContents {\n                        items {\n                            id\n                            level\n                            slug\n                            title\n                            parentId\n                        }\n                    }\n                }\n            }\n        }\n    }\n":
      TadaDocumentNode<{ publication: { post: { slug: string; publishedAt: string; readTimeInMinutes: number; canonicalUrl: string | null; title: string; subtitle: string | null; brief: string; tags: { name: string; slug: string; }[] | null; url: string; reactionCount: number; content: { html: string; }; features: { tableOfContents: { items: { id: string; level: number; slug: string; title: string; parentId: string | null; }[]; }; }; } | null; } | null; }, { slug: string; }, void>;
    "\n    query getPosts {\n        publication(host: \"alexwhiteside.dev/blog\") {\n            posts(first: 10) {\n                edges {\n                    node {\n                        slug\n                        publishedAt\n                        readTimeInMinutes\n                        canonicalUrl\n                        title\n                        subtitle\n                        brief\n                        tags {\n                            name\n                            slug\n                        }\n                        url\n                        reactionCount\n                    }\n                }\n            }\n        }\n    }\n":
      TadaDocumentNode<{ publication: { posts: { edges: { node: { slug: string; publishedAt: string; readTimeInMinutes: number; canonicalUrl: string | null; title: string; subtitle: string | null; brief: string; tags: { name: string; slug: string; }[] | null; url: string; reactionCount: number; }; }[]; }; } | null; }, {}, void>;
  }
}
