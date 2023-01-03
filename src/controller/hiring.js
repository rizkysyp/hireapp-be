const { response } = require(`../middleware/common`);
const {
  addHire,
  firstChat,
  getCompany,
  getEmployee,
  getChat,
  findHireCompany,
  findHireEmployee,
} = require(`../model/hiring`);
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { findCompany } = require("../model/users");

const hireController = {
  addHire: async (req, res) => {
    const company_id = req.payload.id;
    const role = req.payload.role;
    const employee_id = req.params.id;
    const { position, description } = req.body;
    const id = uuidv4();
    let data = {
      id,
      position,
      employee_id,
      company_id,
      description,
    };
    let chat = {
      id,
      employee_id,
      company_id,
      description,
    };
    try {
      if (role === "employee") {
        response(res, 404, false, [], "HANYA ROLE PEREKRUT YANG BISA HIRE");
      }
      await addHire(data);
      await firstChat(chat);
      response(res, 200, false, data, "INPUT DATA HIRE BERHASIL");
    } catch (err) {
      response(res, 404, false, err, " register fail");
    }
  },
  getHire: async (req, res) => {
    const users_id = req.payload.id;
    const role = req.payload.role;
    try {
      if (role === "employee") {
        const result = await getEmployee(users_id);
        response(
          res,
          200,
          true,
          result.rows,
          "HANYA ROLE PEREKRUT YANG BISA HIRE"
        );
      } else if (role === "company") {
        const result = await getCompany(users_id);
        response(
          res,
          200,
          true,
          result.rows,
          "HANYA ROLE PEREKRUT YANG BISA HIRE"
        );
      } else {
        response(res, 400, false, [], "ROLE TIDAK TERBACA");
      }
    } catch (err) {
      response(res, 404, false, err, "GAGAL MENDAPATKAN DATA");
    }
  },
  getChat: async (req, res) => {
    const role = req.payload.role;
    const hire_id = req.params.id;
    try {
      if (role === "employee") {
        let {
          rows: [data],
        } = await findHireCompany(hire_id);
        const perekrut = {
          company_name: data.company_name,
          position: data.position,
          photo: data.photo,
        };
        const result = await getChat(hire_id);
        const hasil = {
          ...pekerja,
          result,
        };
        response(res, 200, true, hasil, "GET DATA SUCCESS", employee);
      } else if (role === "company") {
        let {
          rows: [data],
        } = await findHireEmployee(hire_id);

        const pekerja = {
          name: data.name,
          position: data.position,
          photo: data.photo,
        };

        const result = await getChat(hire_id);
        const chat = result.rows;
        const hasil = {
          ...pekerja,
          chat,
        };
        response(res, 200, true, hasil, "GET DATA SUCCESS");
      } else {
        response(res, 200, false, [], "ROLE TIDAK TERBACA");
      }
    } catch (err) {
      response(res, 404, false, err, "GAGAL MENDAPATKAN DATA");
    }
  },
};

exports.hireController = hireController;
