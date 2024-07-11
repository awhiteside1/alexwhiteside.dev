import {cn} from "@lib/utils.ts";
import {type PostDetail, postDetails} from "@hashnode/queries/getPosts.ts";
import {readFragment} from "../hashnode/graphql";
import {BlogCard} from "@components/BlogCard.tsx";

type Props = {
	tags: string[];
	data: PostDetail[];
};

export default function Blog({ data, tags }: Props) {

const posts = data.map(post => readFragment(postDetails, post))

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
			<div className="col-span-3 sm:col-span-1">
				<div className="sticky top-24">
					<div className="text-sm font-semibold uppercase mb-2 text-black dark:text-white">
						Filter
					</div>
					<ul className="flex flex-wrap sm:flex-col gap-1.5">
						{tags.map((tag) => (
							<li key={tag}>
								<button
									type="button"
									onClick={() => {}}
									className={cn(
										"w-full px-2 py-1 rounded",
										"whitespace-nowrap overflow-hidden overflow-ellipsis",
										"flex gap-2 items-center",
										"bg-black/5 dark:bg-white/10",
										"hover:bg-black/10 hover:dark:bg-white/15",
										"transition-colors duration-300 ease-in-out",
									//	filter.has(tag) && "text-black dark:text-white",
									)}
								>
									<svg
										className={cn(
											"size-5 fill-black/50 dark:fill-white/50",
											"transition-colors duration-300 ease-in-out",
								//			filter.has(tag) && "fill-black dark:fill-white",
										)}
									>
										<title>Selected</title>
										<use
											href={"/ui.svg#square"}
									//		className={cn(!filter.has(tag) ? "block" : "hidden")}
										/>
										<use
											href={"/ui.svg#square-check"}
								//			className={cn(filter.has(tag) ? "block" : "hidden")}
										/>
									</svg>
									{tag}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="col-span-3 sm:col-span-2">
				<div className="flex flex-col">
					<div className="text-sm uppercase mb-2">
						SHOWING {posts.length} OF {data.length} POSTS
					</div>
					<ul className="flex flex-col gap-3">
						{posts.map((post) => (
							<li key={post.url}>
								<BlogCard post={post} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
