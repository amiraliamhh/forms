CREATE TABLE IF NOT EXISTS users (
    "id" serial PRIMARY KEY,
    first_name VARCHAR (25),
    last_name VARCHAR (25),
    email VARCHAR NOT NULL UNIQUE,
    phone_number VARCHAR,
    password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS forms (
    "id" serial PRIMARY KEY,
    form_name VARCHAR (100) NOT NULL,
    "owner" serial REFERENCES users("id"),
    questions json,
    is_active BOOL,
    version INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS multichoice (
    "id" serial PRIMARY KEY,
    question VARCHAR NOT NULL,
    choices VARCHAR ARRAY [0] NOT NULL,
    supports_other BOOL,
    other VARCHAR,
    is_optional BOOL
);

CREATE TABLE IF NOT EXISTS answers (
    "id" serial PRIMARY KEY,
    form serial REFERENCES forms("id") NOT NULL,
    answers json NOT NULL,
    respondent serial REFERENCES users("id"),
    form_version INTEGER NOT NULL
);
