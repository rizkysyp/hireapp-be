const { response } = require(`../middleware/common`);
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const Port = process.env.PORT;
const Host = process.env.HOST;
const {
  insertSkill,
  DeleteSkill,
  GetSkill,
  GetParams,
} = require("../model/addskill");

const addSkillController = {
  Insert: async (req, res, next) => {
    try {
      const { skill } = req.body;
      const { id } = req.payload;
      const users_id = id;
      const data = {
        users_id,
        skill,
      };
      await insertSkill(data);
      response(res, 200, true, data, "input skill success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "input skill failed");
    }
  },
  Delete: async (req, res, next) => {
    try {
      await DeleteSkill(req.params.id);
      response(res, 200, true, [], "delete skill success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "delete skill failed");
    }
  },
  Get: async (req, res, next) => {
    try {
      const { id } = req.payload;
      const users_id = id;
      const data = {
        users_id,
      };
      const result = await GetSkill(data);
      response(res, 200, true, result.rows, "get skill success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "get skill failed");
    }
  },
  GetByParams: async (req, res, next) => {
    try {
      const result = await GetParams(req.params.id);
      response(res, 200, true, result.rows, "get skill success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "get skill failed");
    }
  },
};

exports.addSkillController = addSkillController;
