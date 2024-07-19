# Chosen Tech Stack

A record of significant tech choices and the rationale behind them. More details about the groupings in the [README](./README.md)


## The Real Decisions

### Astro 

I use Astro as my "framework" because this is a mostly static content site that doesnt need to do much on the client, but does need to load blog content from an API.I've always been a fan of the concept of islands and the MDX content built ins are super handy. 

My only real complaint is the lack of storybook-like tooling for astro component development. Which to be fair I consider more an issue with storybook than astro. I had some success running astro fully in the browser via each WebContainers  and NodeBox, but neither was worth it given the scope of this project. 

### gql.tada 🎉

HashNode (where I keep my blog content) exposes a GraphQL API.I believe intellisense is a fundamental human right. Therefore, some kind of graphql tooling and client is called for. 

Until recently this meant accepting the pains of local code generation, but thankfully Typescript is now smart enough to, with some help, infer types directly from graphql queries. Most of the time. 

While I did have to accept a code generation cache to keep typescript from randomly deciding not to resolve query results, it's much more seamless than typical code generation, and eventually will not be necessary. 


## The Active Experiments 

### Tailwind CSS

Unless the UI will be nearly all AI maintainable, which I'm on the fence about being worth it, give me an encapsulated, thoughtfully planned, design system (such as Reshaped) any day of the week. 

#### The Good

- Tooling is mature enough, though I hate that intellisense only works on inline use 
- They defined a balanced and consistant set of utilties that enable non-trivial results (group, hover, shadow)
- LLMs are fantastic at writing it, since its self contained and universal 

#### The Bad 

- It becomes unmanagable often enough to be annoying, mostly because of dark mode. 
    -  Dark mode, which today is fairly simple to do in css globally for 80% of components, instead reqiures you to double the number of classes on every single component, inline. 
    - Defining reusable groups of utilities means losing intelisense or requires custom CSS classes
- Dynamic usage isn't viable, even for finite sets with strong types
-  Use of Margin makes tailwind an all or nothing decision. 

### Idx & nix Dev Environments

A pain to setup with PNPM, but otherwise has promise. Much preferred to codespaces or devcontainer based setups. 

## The Failed Experiments 