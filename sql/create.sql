-- Create users table
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE,
    hashed_pass VARCHAR NOT NULL,
    salt VARCHAR(200),
    access_token VARCHAR,
    avatar VARCHAR NOT NULL
);