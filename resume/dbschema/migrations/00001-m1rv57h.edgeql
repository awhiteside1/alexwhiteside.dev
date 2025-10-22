CREATE MIGRATION m1rv57hmmr6tfo5bfzao66lzytfexmirabfw7uzif3go57rdsl2xia
    ONTO initial
{
  CREATE MODULE Jobs IF NOT EXISTS;
  CREATE MODULE Orgs IF NOT EXISTS;
  CREATE FUTURE simple_scoping;
  CREATE TYPE Orgs::Company {
      CREATE REQUIRED PROPERTY external_ids: std::json {
          SET default := (std::to_json('{}'));
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY raw: std::json;
      CREATE REQUIRED PROPERTY retrieved_at: std::datetime;
  };
  CREATE TYPE Jobs::JobPosting {
      CREATE LINK company: Orgs::Company;
      CREATE REQUIRED PROPERTY raw: std::str;
      CREATE REQUIRED PROPERTY retrieved_at: std::datetime;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY url: std::str;
  };
};
