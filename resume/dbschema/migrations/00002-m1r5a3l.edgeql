CREATE MIGRATION m1r5a3ld62nkuf7aopodqscd3hehvlv6f677nb4gxmstndbezuzg5q
    ONTO m1rv57hmmr6tfo5bfzao66lzytfexmirabfw7uzif3go57rdsl2xia
{
  ALTER TYPE Jobs::JobPosting {
      ALTER PROPERTY retrieved_at {
          SET default := (std::datetime_current());
          RESET OPTIONALITY;
      };
  };
};
