const { response } = require(`../middleware/common`);
const modelPortofolio = require("../model/portofolio");
const cloudinary = require("../config/photo");

const portofolioController = {
  Insert: async (req, res, next) => {
    try {
      const { id } = req.payload;
      const users_id = id;
      const { name, repo, type } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });
      const data = {
        users_id,
        name,
        repo,
        type,
        photo: image.url,
      };
      await modelPortofolio.insertPortofolio(data);
      response(res, 200, true, data, "input portofolio success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "input portofolio failed");
    }
  },
  Get: async (req, res, next) => {
    try {
      const { id } = req.payload;
      const users_id = id;
      const data = {
        users_id,
      };
      const result = await modelPortofolio.getPortofolio(data);
      response(res, 200, true, result.rows, "get portofolio success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "get portofolio failed");
    }
  },
  Delete: async (req, res, next) => {
    try {
      const id_table = req.params.id;
      const data = {
        id_table,
      };
      await modelPortofolio.delPortofolio(data);
      response(res, 200, true, data, "delete portofolio success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "delete portofolio failed");
    }
  },
  Put: async (req, res, next) => {
    try {
      const { name, repo, type } = req.body;
      const id_table = req.params.id;
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });
      const data = {
        id_table,
        name,
        repo,
        type,
        photo: image.url,
      };
      await modelPortofolio.putPortofolio(data);
      response(res, 200, true, data, "edit portofolio success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "edit portofolio failed");
    }
  },
};

exports.portofolioController = portofolioController;
