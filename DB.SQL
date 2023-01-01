-- Active: 1672568412422@@pijardb-do-user-13063919-0.b.db.ondigitalocean.com@25060@hireapp-jenaka@public
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    status INT DEFAULT 0,
    otp INT NOT NULL);
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    users_id VARCHAR NOT NULL,
    job VARCHAR DEFAULT NULL,
    province VARCHAR DEFAULT NULL,
    city VARCHAR DEFAULT NULL,
    workplace VARCHAR DEFAULT NULL,
    github VARCHAR DEFAULT NULL,
    instagram VARCHAR DEFAULT NULL,
    description VARCHAR DEFAULT NULL,
    photo VARCHAR DEFAULT 'https://res.cloudinary.com/dnu5su7ft/image/upload/v1671602986/flyer/default_profile.png'
);

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    company_name VARCHAR NOT NULL,
    users_id VARCHAR NOT NULL,
    position VARCHAR NOT NULL,
    province VARCHAR DEFAULT NULL,
    city VARCHAR DEFAULT NULL,
    email VARCHAR DEFAULT NULL,
    companyphone BIGINT DEFAULT NULL,
    linkedin VARCHAR DEFAULT NULL,
    photo VARCHAR DEFAULT 'https://res.cloudinary.com/dnu5su7ft/image/upload/v1671602986/flyer/default_profile.png'
);

SELECT users.id,users.email,profile.job as job, profile.province as province,
profile.city as city, profile.workplace as workplace,profile.description as description,
profile.photo as photo FROM users as users
INNER Join employee as profile ON users.id = profile.user_id
WHERE users.id = 'c4755808-9fea-473a-ad56-8fed376da2eb';

SELECT users.id,users.email,profile.company_name as company_name, profile.position as position,
profile.province as province,profile.city as city, profile.email as email,profile.companyphone as companyphone,
profile.linkedin as linkedin,profile.photo as photo FROM users as users
INNER Join company as profile ON users.id = profile.user_id
WHERE users.id = '1a1d5b1f-d194-4bfa-b74d-35f12d80874a';


SELECT users.id,users.email,profile.job as job, profile.province as province,
profile.city as city, profile.workplace as workplace,profile.description as description,
profile.photo as photo FROM users as users
INNER Join employee as profile ON users.id = profile.user_id
WHERE users.role = 'employee';

SELECT users.id,profile.name as name,users.email,profile.job as job, profile.province as province,
    profile.city as city, profile.workplace as workplace,profile.description as description,
    profile.photo as photo FROM users as users
    INNER Join employee as profile ON users.id = profile.user_id
    WHERE users.role = 'employee' AND profile.name ILIKE '%%';