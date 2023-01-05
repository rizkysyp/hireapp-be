const { response } = require(`../middleware/common`);
const {
  registerUser,
  findEmail,
  insertEmployee,
  insertCompany,
  updateCompany,
  updateEmployee,
  findEmployee,
  findCompany,
  findUsers,
  profileCompany,
  profileEmploye,
  verif,
  allEmployee,
} = require(`../model/users`);
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const {
  generateToken,
  generateRefreshToken,
  decodeToken,
} = require(`../helpers/auth`);
const email = require("../middleware/email");
const cloudinary = require("../config/photo");

const Port = process.env.PORT;
const Host = process.env.HOST;

const UsersController = {
  register: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (users) {
      return response(res, 404, false, "email already use", " register fail");
    }

    // create otp
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    const id = uuidv4();
    const role = req.params.role;
    let password = bcrypt.hashSync(req.body.password);
    let password1 = req.body.password;
    let confirm = req.body.confirm;
    let data = {
      id,
      email: req.body.email,
      password,
      role,
      phone: req.body.phone,
      otp,
    };
    let profile = {
      id,
      name: req.body.name,
      company_name: req.body.company_name,
      position: req.body.position,
    };

    if (password1 !== confirm) {
      return response(res, 404, false, null, "password tidak sesuai");
    }
    try {
      if (role === "company") {
        await insertCompany(profile);
      } else if (role === "employee") {
        await insertEmployee(profile);
      } else {
        return response(
          res,
          404,
          false,
          null,
          "Wrong Role Input, Check it again"
        );
      }
      const result = await registerUser(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        let text = `Hello ${req.body.fullname} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifUrl}`;
        const subject = `${otp} is your otp`;
        let sendEmail = email(req.body.email, subject, text);
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "register fail");
        }

        response(
          res,
          200,
          true,
          { email: data.email },
          "register success please check your email"
        );
      }
    } catch (err) {
      response(res, 404, false, err, " register fail");
    }
  },
  verif: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return response(res, 404, false, null, "email not found");
    }

    if (users.otp == otp) {
      await verif(email);
      return response(
        res,
        200,
        true,
        req.body.email,
        "verification account success"
      );
    }
    return response(res, 404, false, null, "wrong otp please check your email");
  },
  login: async (req, res) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (!users) {
      return response(res, 404, false, null, " email not found");
    }

    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 404, false, null, "wrong password");
    }

    if (users.status == 0) {
      return response(res, 404, false, null, "account not verified");
    }

    delete users.password;
    delete users.status;
    delete users.otp;
    let payload = {
      id: users.id,
      fullname: users.fullname,
      email: users.email,
      role: users.role,
    };
    let accessToken = generateToken(payload);
    let refToken = generateRefreshToken(payload);

    users.token = accessToken;
    users.refreshToken = refToken;
    response(res, 200, true, users, "login success");
  },
  updateCompany: async (req, res, next) => {
    try {
      const {
        company_name,
        position,
        province,
        city,
        company_email,
        companyphone,
        linkedin,
        description,
      } = req.body;
      const { id } = req.payload;
      const photo = req.file?.path || null;
      let image;

      if (photo) {
        image = await cloudinary.uploader.upload(photo, {
          folder: "toko",
        });
      }
      const {
        rows: [company],
      } = await findCompany(id);

      if (!company) {
        response(
          res,
          404,
          false,
          null,
          "Data Perekrut Tidak Ada! silahkan hubungi admin"
        );
      } else {
        const dataProfile = {
          id,
          company_name: company_name || null,
          position: position || null,
          province: province || null,
          city: city || null,
          company_email: company_email || null,
          companyphone: companyphone || null,
          linkedin: linkedin || null,
          description: description || null,

          photo: image?.url,
        };

        await updateCompany(dataProfile);
        response(res, 200, true, dataProfile, "update data success");
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, "update data failed");
    }
  },
  updateEmployee: async (req, res, next) => {
    try {
      const {
        name,
        job,
        province,
        city,
        workplace,
        description,
        instagram,
        github,
      } = req.body;
      const { id } = req.payload;
      const photo = req.file?.path || null;
      let image;

      if (photo) {
        image = await cloudinary.uploader.upload(photo, {
          folder: "toko",
        });
      }

      const {
        rows: [employee],
      } = await findEmployee(id);

      if (!employee) {
        response(
          res,
          404,
          false,
          null,
          "Data Pekerja Tidak Ada!, silahkan hubungi admin"
        );
      } else {
        const dataProfile = {
          id,
          name: name || null,
          job: job || null,
          province: province || null,
          city: city || null,
          workplace: workplace || null,
          description: description || null,
          instagram: instagram || null,
          github: github || null,
          photo: image?.url,
        };

        await updateEmployee(dataProfile);
        response(res, 200, true, dataProfile, "update data success");
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, "update data failed");
    }
  },
  profile: async (req, res, next) => {
    try {
      const { id } = req.payload;

      let {
        rows: [users],
      } = await findUsers(id);

      if (users.role === "employee") {
        const result = await profileEmploye(id);
        response(res, 200, true, result.rows, "GET EMPLOYEE PROFILE SUCCESS");
        console.log("Employe");
      } else if (users.role === "company") {
        const result = await profileCompany(id);
        response(res, 200, true, result.rows, "GET COMPANY PROFILE SUCCESS");
      } else {
        response(
          res,
          404,
          false,
          null,
          "ROLE TIDAK DITEMUKAN,SILAHKAN HUBUNGI ADMIN"
        );
      }
    } catch (error) {
      response(res, 404, error, "DATA TIDAK DITEMUKAN");
    }
  },
  AllEmployee: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const result = await allEmployee({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      response(res, 200, true, result.rows, "GET EMPLOYEE DATA SUCCESS");
    } catch (error) {
      response(res, 404, error, "DATA TIDAK DITEMUKAN");
    }
  },
  detailEmployee: async (req, res, next) => {
    try {
      const result = await profileEmploye(req.params.id);
      response(res, 200, true, result.rows, "GET EMPLOYEE SUCESS");
    } catch (error) {
      response(res, 404, error, "DATA TIDAK DITEMUKAN");
    }
  },
};

exports.UsersController = UsersController;
