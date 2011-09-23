CREATE ROLE hinky LOGIN
PASSWORD '<change password>'
  NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE;

CREATE DATABASE hinky
  WITH OWNER = hinky
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       CONNECTION LIMIT = -1;

CREATE SCHEMA hnk
  AUTHORIZATION hinky;

CREATE TABLE hnk."HinkPinks"
(
  hinkpinkid uuid NOT NULL,
  riddle character varying(255) NOT NULL,
  solution character varying(255) NOT NULL,
  syllablecount integer NOT NULL,
  CONSTRAINT pk_hinkpinks PRIMARY KEY (hinkpinkid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE hnk."HinkPinks" OWNER TO postgres;
GRANT ALL ON TABLE hnk."HinkPinks" TO postgres;
GRANT SELECT ON TABLE hnk."HinkPinks" TO hinky;
