import {formatDate} from '@lib/utils'
import type {postDetails} from '@hashnode/queries/getPosts.ts'
import {type ResultOf} from 'gql.tada'

type Props = {
	post: ResultOf<typeof postDetails>
}

export function BlogCard({ post }: Props) {
	return (
		<a
			href={`/blog/${post.slug}`}
			className="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
		>
			<div className="w-full group-hover:text-black group-hover:dark:text-white blend">
				<div className="flex flex-wrap items-center gap-2">
					<div className="text-sm uppercase">
						{formatDate(new Date(post.publishedAt))}
					</div>
				</div>
				<div className="font-semibold mt-3 text-black dark:text-white">
					{post.title}
				</div>

				<div className="text-sm line-clamp-2">{post.brief}</div>
				<ul className="flex flex-wrap mt-2 gap-1">
					{post.tags?.map(
						(
							{ name }, // this line has an error; Parameter 'tag' implicitly has an 'any' type.ts(7006)
						) => (
							<li
								key={name}
								className="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75"
							>
								{name}
							</li>
						),
					)}
				</ul>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				className="stroke-current group-hover:stroke-black group-hover:dark:stroke-white"
			>
				<title>Thing</title>
				<line
					x1="5"
					y1="12"
					x2="19"
					y2="12"
					className="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
				/>
				<polyline
					points="12 5 19 12 12 19"
					className="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
				/>
			</svg>
		</a>
	)
}
