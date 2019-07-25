DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'qtype') THEN
        -- qtype: question types
        CREATE TYPE qtype AS ENUM (
            'multichoice'
        );
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question') THEN
        CREATE TYPE question AS (
            question_type qtype,
            qid INT
        );
    END IF;
END $$;

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
    questions question ARRAY [0],
    is_active BOOL
);
