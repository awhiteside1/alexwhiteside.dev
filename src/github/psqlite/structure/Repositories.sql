CREATE EXTENSION IF NOT EXISTS vector;


CREATE TABLE IF NOT EXISTS Repositories
(
    id          INTEGER PRIMARY KEY,
    name        VARCHAR,
    url         VARCHAR,
    json        JSONB,
    description TEXT,
    language    VARCHAR,
    topics      VARCHAR,
    loaded      BOOLEAN DEFAULT false
);



CREATE TABLE IF NOT EXISTS Topics
(
    original  VARCHAR PRIMARY KEY,
    embedding vector(768)

);



CREATE TABLE IF NOT EXISTS TOPICS_REPOSITORIES
(
    repository INTEGER REFERENCES Repositories (id),
    topic      varchar references Topics (original)

);