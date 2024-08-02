import { surql } from 'surrealdb.js'

export const insert = surql`
LET $repo = (CREATE repository CONTENT {
      name:  $name,
        url: string::concat('https://github.com',$name),
    githubId:rand::int()
});

CREATE resource CONTENT {
      source: string::concat('https://google.com/thing/', rand::string()),
    repository: $repo[0].id
};`
