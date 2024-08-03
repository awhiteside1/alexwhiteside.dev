DEFINE TABLE resource TYPE  RELATION FROM repository TO text  SCHEMAFULL ;
DEFINE FIELD uuid ON TABLE resource VALUE rand::uuid::v7() type uuid;
DEFINE FIELD url ON TABLE resource TYPE string;
DEFINE FIELD kind ON TABLE resource TYPE string;

