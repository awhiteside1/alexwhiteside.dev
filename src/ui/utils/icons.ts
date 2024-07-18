interface Options {
  name: string;
  version?: string;
  source?: keyof typeof sources;
}

import { parallel, sift, first } from "radash";

const sources = {
  tech: ({ name, version = "plain" }) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${version}.svg`,
  simple: ({ name }) =>
    `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${name}.svg`,
  local: ({name})=> `local:${name}`
} satisfies Record<string, (options: Omit<Options, "source">) => string>;

export const resolveIcon = async (options: Options):Promise<string> => {
  const toCheck = sift([
    options.source ? sources[options.source] : undefined,
    ...Object.values(sources),
  ]);
  const results = await parallel(3, toCheck, async (fn) =>
    fetchIcon(fn(options)),
  );
  const result =  first(sift(results))
  return result ?? '<svg/>'
};

const fetchIcon = async (url: string) => {
  if(url.startsWith('http')){
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.text();
    if (data) return data;
  }
}

  if(url.startsWith('local:')){
    const name = url.replace('local:', '')
    try{
   const data = await import(`./icons/${name}.svg?raw`)
   if(data.default) return data.default
    }catch(err){}
  }
  return undefined;
};
