const Pool = require(`../config/db`);

const registerUser = (data) => {
  const { id, email, password, phone, role, otp } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id, email, password,phone, role, otp) 
          VALUES('${id}','${email}','${password}','${phone}','${role}','${otp}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findEmployee = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM employee where users_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findCompany = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM company where users_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const insertEmployee = (profile) => {
  const { id, name } = profile;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO employee(users_id,name) 
            VALUES('${id}','${name}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const insertCompany = (profile) => {
  const { id, name, company_name, position } = profile;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO company(users_id,name,company_name,position) 
              VALUES('${id}','${name}','${company_name}','${position}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};
const verif = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET status=1 WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const updateCompany = ({
  id,
  company_name,
  position,
  province,
  city,
  company_email,
  companyphone,
  linkedin,
  photo,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE company SET company_name = COALESCE($2, company_name), position = COALESCE($3, position), province = COALESCE($4, province),
      city = COALESCE($5, city), email = COALESCE($6, email),companyphone = COALESCE($7,companyphone),
      linkedin = COALESCE($8,linkedin),photo = COALESCE($9,photo) WHERE users_id = $1`,
      [
        id,
        company_name,
        position,
        province,
        city,
        company_email,
        companyphone,
        linkedin,
        photo,
      ],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const updateEmployee = ({
  id,
  name,
  job,
  province,
  city,
  workplace,
  description,
  photo,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE employee SET name = COALESCE($2, name), job = COALESCE($3, job), province = COALESCE($4, province),
      city = COALESCE($5, city),workplace = COALESCE($6, workplace),description = COALESCE($7,description),
      photo = COALESCE($8,photo) WHERE users_id = $1`,
      [id, name, job, province, city, workplace, description, photo],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const profileEmploye = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT users.id,users.email,profile.job as job, profile.province as province,
    profile.city as city, profile.workplace as workplace,profile.description as description,
    profile.photo as photo FROM users as users
    INNER Join employee as profile ON users.id = profile.users_id
    WHERE users.id = '${id}';`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const profileCompany = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT users.id,users.email,profile.company_name as company_name, profile.position as position,
    profile.province as province,profile.city as city, profile.email as email,profile.companyphone as companyphone,
    profile.linkedin as linkedin,profile.photo as photo FROM users as users
    INNER Join company as profile ON users.id = profile.users_id
    WHERE users.id = '${id}';`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findUsers = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users where id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const allEmployee = ({ limit, offset, sortBy, sortOrder, search }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT users.id,profile.name as name,users.email,profile.job as job, profile.province as province,
    profile.city as city, profile.workplace as workplace,profile.description as description,
    profile.photo as photo FROM users as users
    INNER Join employee as profile ON users.id = profile.users_id
    WHERE users.role = 'employee' AND profile.name ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} 
    LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  registerUser,
  findEmail,
  insertEmployee,
  insertCompany,
  updateCompany,
  updateEmployee,
  findEmployee,
  findCompany,
  verif,
  profileEmploye,
  profileCompany,
  findUsers,
  allEmployee,
};
