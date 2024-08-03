# $queryVector
#SELECT  <-resource<-repository.* as repos, vector::similarity::cosine(embedding, $queryVector) AS distance from text where embedding <|2|> $queryVector order by distance ;
SELECT id,githubId, name from repository where  ->resource->text CONTAINSANY (Select VALUE id from text where embedding <|5|> $queryVector );