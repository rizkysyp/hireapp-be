const Pool = require(`../config/db`);

const insertPortofolio = (data) => {
  const { users_id, name, repo, type, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO portofolio(users_id,name,repo,type,photo) 
              VALUES('${users_id}','${name}','${repo}','${type}','${photo}')`,
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

const getPortofolio = (data) => {
  const { users_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM portofolio WHERE portofolio.users_id='${users_id}'`,
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

const detailPortofolio = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM portofolio where id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const putPortofolio = (data) => {
  const { name, repo, type, photo, id_table } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE portofolio SET name = '${name}', repo = '${repo}', type = '${type}', photo = '${photo}' WHERE id='${id_table}'`,
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

const delPortofolio = (data) => {
  const { id_table } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM portofolio WHERE id='${id_table}'`,
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
  insertPortofolio,
  getPortofolio,
  putPortofolio,
  delPortofolio,
  detailPortofolio,
};
