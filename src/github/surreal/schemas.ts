import { type Surreal, surql } from 'surrealdb.js'

export const initSchema = async (db: Surreal) => {
    const query = surql`
DEFINE TABLE repository SCHEMAFULL;

DEFINE FIELD name ON TABLE repository TYPE string;
DEFINE FIELD uuid ON TABLE repository VALUE rand::uuid::v7();
DEFINE FIELD url ON TABLE repository TYPE string   ASSERT string::is::url($value);
DEFINE FIELD details ON TABLE repository FLEXIBLE;
DEFINE FIELD githubId on TABLE repository TYPE int;
DEFINE FIELD created on TABLE repository VALUE time::now();

#------


DEFINE TABLE resource SCHEMAFULL;
DEFINE FIELD uuid ON TABLE resource VALUE rand::uuid::v7();
DEFINE FIELD source ON TABLE resource TYPE string;
DEFINE FIELD created on TABLE resource TYPE datetime VALUE time::now();
DEFINE FIELD repository on TABLE resource TYPE record<repository>
`

    await db.query(query)
}
