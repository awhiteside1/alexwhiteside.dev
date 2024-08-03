DEFINE TABLE text TYPE NORMAL SCHEMAFULL;

DEFINE FIELD original ON TABLE text TYPE string;
DEFINE FIELD embedding on TABLE text TYPE array<number>;

DEFINE INDEX text_embedding_vector ON text FIELDS embedding MTREE DIMENSION 768 DIST COSINE TYPE F32;
