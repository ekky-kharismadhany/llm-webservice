CREATE TABLE IF NOT EXISTS documents (
    uuid varchar(256),
    source_type_id int,
    source varchar(1024),
    PRIMARY KEY ("uuid")
);

CREATE TABLE IF NOT EXISTS source_types (
    id SERIAL,
    name varchar(64),
    PRIMARY KEY ("id")
);

ALTER TABLE documents ADD CONSTRAINT "fk_source_types" FOREIGN KEY ("source_type_id") REFERENCES "source_types"("id");

ALTER TABLE documents ADD CONSTRAINT "unique_source" UNIQUE source;

CREATE TABLE IF NOT EXISTS places (
    uuid bigserial PRIMARY KEY,
    name varchar(256),
    latitude float,
    longitude float,
    city varchar(128),
    province varchar(128)
)