/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode, $tada } from 'gql.tada';

declare module 'gql.tada' {
 interface setupCache {
    "\nfragment comment on Comment{\n    content {\n        html\n    }\n    id\n    author {\n        name\n        id\n        profilePicture\n    }\n    dateAdded\n    totalReactions\n}\n":
      TadaDocumentNode<{ content: { html: string; }; id: string; author: { name: string; id: string; profilePicture: string | null; }; dateAdded: string; totalReactions: number; }, {}, { fragment: "comment"; on: "Comment"; masked: true; }>;
    "fragment PostDetails on Post {\n    \n    publishedAt\n    readTimeInMinutes\n    canonicalUrl\n    title\n    subtitle\n    brief\n    tags {\n        name\n        slug\n    }\n    url\n    reactionCount\n    \n}":
      TadaDocumentNode<{ publishedAt: string; readTimeInMinutes: number; canonicalUrl: string | null; title: string; subtitle: string | null; brief: string; tags: { name: string; slug: string; }[] | null; url: string; reactionCount: number; }, {}, { fragment: "PostDetails"; on: "Post"; masked: true; }>;
    "fragment PostContent on Post{\n    content {\n        html\n    }\n}":
      TadaDocumentNode<{ content: { html: string; }; }, {}, { fragment: "PostContent"; on: "Post"; masked: true; }>;
    "query getPosts{\n    publication(host: \"alexwhiteside.dev/blog\") {\n        posts(first: 10) {\n            edges {\n                node {\n                    comments(first: 10){\n                        edges {\n                            node {\n                                ...comment\n                            }\n                        }\n                    }\n                    ...PostDetails\n                }\n            }\n        }\n    }\n}":
      TadaDocumentNode<{ publication: { posts: { edges: { node: { comments: { edges: { node: { [$tada.fragmentRefs]: { comment: "Comment"; }; }; }[]; }; [$tada.fragmentRefs]: { PostDetails: "Post"; }; }; }[]; }; } | null; }, {}, void>;
    "query getPost($slug: String!){\n        publication(host: \"alexwhiteside.dev/blog\") {\n            post(slug: $slug) {\n                ...PostDetails, \n                ...PostContent\n            }\n        }\n    }":
      TadaDocumentNode<{ publication: { post: { [$tada.fragmentRefs]: { PostDetails: "Post"; } & { PostContent: "Post"; }; } | null; } | null; }, { slug: string; }, void>;
  }
}
