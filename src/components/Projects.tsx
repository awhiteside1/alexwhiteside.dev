import type { CollectionEntry } from "astro:content";
import ArrowCard from "@components/ArrowCard";
import { useEffect, useState } from "react";

type Props = {
	tags: string[];
	data: CollectionEntry<"projects">[];
};

export default function Projects({ data }: Props) {
	const [filter] = useState(new Set<string>());
	const [projects, setProjects] = useState<CollectionEntry<"projects">[]>([]);

	useEffect(() => {
		setProjects(
			data.filter((entry) =>
				Array.from(filter).every((value) =>
					entry.data.tags.some(
						(tag: string) => tag.toLowerCase() === String(value).toLowerCase(),
					),
				),
			),
		);
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
			<div className="col-span-3 sm:col-span-1">
				<div className="sticky top-24">
					<div className="text-sm font-semibold uppercase mb-2 text-black dark:text-white">
						Filter
					</div>
					<ul className="flex flex-wrap sm:flex-col gap-1.5" />
				</div>
			</div>
			<div className="col-span-3 sm:col-span-2">
				<div className="flex flex-col">
					<div className="text-sm uppercase mb-2">
						SHOWING {projects.length} OF {data.length} PROJECTS
					</div>
					<ul className="flex flex-col gap-3">
						{projects.map((project) => (
							<li key={project.slug}>
								<ArrowCard entry={project} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
