DEFINE TABLE repository TYPE NORMAL SCHEMAFULL;

DEFINE FIELD name ON TABLE repository TYPE string;
DEFINE FIELD uuid ON TABLE repository VALUE rand::uuid::v7() TYPE uuid;
DEFINE FIELD url ON TABLE repository TYPE string   ASSERT string::is::url($value);
DEFINE FIELD details ON TABLE repository FLEXIBLE type object;
DEFINE FIELD githubId on TABLE repository TYPE int;
DEFINE FIELD created on TABLE repository VALUE time::now() type datetime;
DEFINE FIELD topics on TABLE repository TYPE array<string>;


DEFINE INDEX IF NOT EXISTS repository_name on repository FIELDS name UNIQUE;