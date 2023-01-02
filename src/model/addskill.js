const Pool = require(`../config/db`);

const insertSkill = (data) => {
  const { users_id, skill } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO skill(users_id,skill) 
              VALUES('${users_id}','${skill}')`,
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
const DeleteSkill = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM skill WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};
const GetSkill = (data) => {
  const { users_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id,skill FROM skill WHERE skill.users_id='${users_id}'`,
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
  insertSkill,
  DeleteSkill,
  GetSkill,
};
