CREATE DATABASE pernstack;

CREATE TABLE users(
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(user_id)
);