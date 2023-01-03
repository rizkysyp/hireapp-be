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

CREATE TABLE hire (
    id VARCHAR PRIMARY KEY,
    position VARCHAR NOT NULL,
    employee_id VARCHAR NOT NULL,
    company_id VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    hire_id VARCHAR NOT NULL,
    receiver_id VARCHAR NOT NULL,
    sender_id VARCHAR NOT NULL,
    chat VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- POV USERS PEKERJA PAS MAU NGECHAT
SELECT hire.id,hire.position,hire.employee_id,hire.company_id,profile.company_name as company_name,
profile.photo as photo FROM hire as hire INNER JOIN company as profile ON hire.company_id = profile.users_id
WHERE hire.employee_id = '8f1db5db-f362-4007-ab3b-86cae92b7c3c';

-- POV USERS PEREKRUT PAS MAU NGECHAT
SELECT hire.id,hire.position,hire.employee_id,hire.company_id,profile.name as name,
profile.photo as photo FROM hire as hire INNER JOIN employee as profile ON hire.employee_id = profile.users_id
WHERE hire.company_id = 'b5e736ba-115f-484a-90c4-01d6df026f1d';

-- POV USERS PEKERJA NGECHAT PEREKRUT
INSERT INTO chat (hire_id, receiver_id, sender_id, chat)
SELECT id, company_id, '8f1db5db-f362-4007-ab3b-86cae92b7c3c', 'Baik Pak, Kira2 kapan?'
  FROM hire
 WHERE id = '1a9d50ca-3dae-4e70-9805-1cf003ec832d';

 -- POV USERS PEREKRUT NGECHAT PEKERJA
INSERT INTO chat (hire_id, receiver_id, sender_id, chat)
SELECT id, employee_id, 'b5e736ba-115f-484a-90c4-01d6df026f1d', 'Tanggal 18 Januari 2022 apakah kamu bisa datang?'
  FROM hire
 WHERE id = '1a9d50ca-3dae-4e70-9805-1cf003ec832d';


 -- POV ALL USERS CHAT 
SELECT chat.id,chat.hire_id,chat.receiver_id,chat.sender_id,chat.chat,chat.created_at FROM chat as chat
WHERE chat.hire_id='1a9d50ca-3dae-4e70-9805-1cf003ec832d';

-- Find Data Hire Perekrut
SELECT hire.id as hire_id,hire.position,profile.company_name as company_name,
profile.photo as photo FROM hire as hire INNER JOIN company as profile ON hire.company_id = profile.users_id
WHERE hire.id = '1a9d50ca-3dae-4e70-9805-1cf003ec832d';

SELECT hire.id,hire.position,hire.employee_id,profile.name as name,
profile.photo as photo FROM hire as hire INNER JOIN employee as profile ON hire.employee_id = profile.users_id
WHERE hire.id = '1a9d50ca-3dae-4e70-9805-1cf003ec832d';