import type { Repository } from "@github/types";
import Language from "./Language.astro"

export const tabs = {
    "Purpose":{ selector: (repo:Repository)=> true,Component: Language},
    "Language":{ selector: (repo:Repository)=> repo.language, Component: Language},
    "Kind": {selector: (repo:Repository)=> "Repository",Component: Language},
    "Ecosystem": {selector: (repo:Repository)=> repo.topics.pop(),Component: Language   },
    "LLM": {selector: (repo:Repository)=> repo.topics.includes("llm"),Component: Language},
}