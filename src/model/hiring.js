const Pool = require(`../config/db`);

const addHire = (data) => {
  const { id, position, employee_id, company_id, description } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO hire(id,position,employee_id,company_id,description) 
              VALUES('${id}','${position}','${employee_id}','${company_id}','${description}')`,
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

const firstChat = (data) => {
  const { id, employee_id, company_id, description } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO chat(hire_id,receiver_id,sender_id,chat) 
                VALUES('${id}','${employee_id}','${company_id}','${description}')`,
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
const getEmployee = (users_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT hire.id,hire.position,hire.employee_id,hire.company_id,profile.company_name as company_name,
        profile.photo as photo FROM hire as hire INNER JOIN company as profile ON hire.company_id = profile.users_id
        WHERE hire.employee_id = '${users_id}'`,
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

const getCompany = (users_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT hire.id,hire.position,hire.employee_id,hire.company_id,profile.name as name,
        profile.photo as photo FROM hire as hire INNER JOIN employee as profile ON hire.employee_id = profile.users_id
        WHERE hire.company_id = '${users_id}'`,
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

const getChat = (hire_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT chat.id,chat.hire_id,chat.receiver_id,chat.sender_id,chat.chat,chat.created_at FROM chat as chat
        WHERE chat.hire_id='${hire_id}'`,
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
const findHireCompany = (hire_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT hire.id as hire_id,hire.position,profile.company_name as company_name,
        profile.photo as photo FROM hire as hire INNER JOIN company as profile ON hire.company_id = profile.users_id
        WHERE hire.id = '${hire_id}';`,
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

const findHireEmployee = (hire_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT hire.id,hire.position,hire.employee_id,profile.name as name,
      profile.photo as photo FROM hire as hire INNER JOIN employee as profile ON hire.employee_id = profile.users_id
      WHERE hire.id = '${hire_id}'`,
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

const chatEmployee = (data) => {
  const { hire_id, users_id, chat } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO chat (hire_id, receiver_id, sender_id, chat)
      SELECT id, company_id, '${users_id}', '${chat}'
        FROM hire
       WHERE id = '${hire_id}';`,
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

const chatCompany = (data) => {
  const { hire_id, users_id, chat } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO chat (hire_id, receiver_id, sender_id, chat)
      SELECT id, employee_id, '${users_id}', '${chat}'
        FROM hire
       WHERE id = '${hire_id}'`,
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
  addHire,
  firstChat,
  getEmployee,
  getCompany,
  getChat,
  findHireCompany,
  findHireEmployee,
  chatEmployee,
  chatCompany,
};
