const Pool = require("./../config/db");

const insertData = (data) => {
  const { id, position, work_start, work_end, description, company_name } =
    data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO experiences(users_id,position,work_start,work_end,description,company_name) VALUES('${id}','${position}','${work_start}','${work_end}','${description}','${company_name}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateData = (id, data) => {
  const { position, work_start, work_end, description, company_name } = data;
  return Pool.query(
    `UPDATE experiences SET position='${position}', work_start='${work_start}', work_end='${work_end}', description='${description}', company_name='${company_name}' WHERE id='${id}'`
  );
};

const selectDetail = (id) =>
  new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM experiences where id='${id}' `, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

const selectDataParams = (id) => {
  return Pool.query(`SELECT * FROM experiences where users_id='${id}'`);
};

const selectDataExperience = (id) => {
  return Pool.query(`SELECT * FROM experiences where users_id='${id}'`);
};

const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM experiences WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  insertData,
  updateData,
  selectDetail,
  selectDataExperience,
  deleteData,
  selectDataParams,
};
