const Pool = require(`../config/db`);

const insertExperience = (data) => {
    const { users_id, position,work_start,work_end,description } = data;
    return new Promise((resolve, reject) =>
      Pool.query(
        `INSERT INTO experiences(users_id,position,work_start,work_end,description) 
              VALUES('${users_id}','${position}',${work_start},${work_end},${description})`,
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
    insertExperience

}