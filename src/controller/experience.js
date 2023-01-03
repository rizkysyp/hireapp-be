const ModelExperience = require("./../model/experience");
const { response } = require("../middleware/common");

const experienceController = {
  insert: async (req, res, next) => {
    try {
      const { position, work_start, work_end, description, company_name } =
        req.body;

      const { id } = req.payload;

      const data = {
        id,
        position,
        work_start,
        work_end,
        description,
        company_name,
      };

      await ModelExperience.insertData(data);
      response(res, 200, true, data, "input data sukses");
    } catch (err) {
      return response(res, 404, false, err, "input data fail");
    }
  },
  update: (req, res, next) => {
    ModelExperience.updateData(req.params.id, req.body)
      .then((result) =>
        response(res, 200, true, result.rows, "update data success")
      )
      .catch((err) =>
        response(res, 404, false, err.routine, "update data fail")
      );
  },
  delete: (req, res, next) => {
    ModelExperience.deleteData(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "delete data success")
      )
      .catch((err) =>
        response(res, 404, false, err.routine, "delete data fail")
      );
  },
  getById: async (req, res, next) => {
    ModelExperience.selectDetail(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, "get data faill"));
  },
  getExperience: (req, res, next) => {
    const { id } = req.payload;
    ModelExperience.selectDataExperience(id)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err.routine, "get data fail"));
  },
};

exports.experienceController = experienceController;
