const Pool = require('./../config/db');

const selectData = () => {
    return Pool.query(`SELECT * FROM hire`);
}

const insertData = (data) => {
   const {
    id,
    fullname,
    tujuan,
    email,
    phonenumber,
    description,
    id_pekerja,
    id_perekrut,
} = data;
   return new Promise((resolve,reject ) => { 
   Pool.query(`INSERT INTO hire(fullname,tujuan,email,phonenumber,description,id_pekerja,id_perekrut) VALUES('${fullname}','${tujuan}','${email}',${phonenumber},'${description}','${id_pekerja}','${id_perekrut}')`,
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

const selectDataById = (id_perekrut) => 
  new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM hire where id_perekrut='${id_perekrut}' `, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });


const updateData = (id, data) => {
  const { fullname,email,phonenumber,description } = data;
  return Pool.query(
    `UPDATE hire SET fullname='${fullname}', email='${email}', phonenumber=${phonenumber}, description='${description}' WHERE id='${id}'`
  );
};

const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM hire WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};



 module.exports = {insertData,selectData,selectDataById,updateData,deleteData}