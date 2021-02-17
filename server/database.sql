
CREATE DATABASE edusearch;

CREATE TABLE email_token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255),
    create_at TIMESTAMP(3),
    update_at TIMESTAMP(3),
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,  /*function that increases PK to ensure uniqueness*/
  name VARCHAR(255),
  email VARCHAR(255),
  salt VARCHAR(255),
  hash VARCHAR(255),
  access_token VARCHAR(255),
  access_token_create_at TIMESTAMP(3), /**/
  create_at TIMESTAMP(3),
  update_at TIMESTAMP(3),
  avatar TEXT /* no url datatype in postgres, in case longer than 255 char */
);

CREATE TABLE grade (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	created_at TIMESTAMP(3),
    update_at TIMESTAMP(3)
);

CREATE TABLE location (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	created_at TIMESTAMP(3),
    update_at TIMESTAMP(3)
);

CREATE TABLE subject (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	created_at TIMESTAMP(3),
    update_at TIMESTAMP(3)
);

CREATE TABLE lesson (
	id SERIAL PRIMARY KEY,
    user_id INTEGER,
	grade_id INTEGER, /**/
	subject_id INTEGER, /**/
	price INTEGER,
    role INTEGER, /* to identify whether this lesson is for tutor or student????? */
    created_at TIMESTAMP(3),
	updated_at TIMESTAMP(3)
);

CREATE TABLE tutor_post(
    id SERIAL PRIMARY KEY, 
    user_id INTEGER,
    name VARCHAR(255), /**/
    location_id INTEGER,
    lessons_id INTEGER[],
);

CREATE TABLE student_post(
    id SERIAL PRIMARY KEY, 
    user_id INTEGER,
    name VARCHAR(255), /**/
    contact VARCHAR(255),
    grade_id INTEGER,
    location_id INTEGER,
    price INTEGER,
    subject_id INTEGER,
    description TEXT
);