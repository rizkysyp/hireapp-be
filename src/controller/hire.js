const hire = require("../model/hire")
const { response } = require("../middleware/common");


const hireController = {
    insert: async (req,res,next)=>{
        try {
            
            const { role, company_name, description } = req.body;

            const id_pekerja = req.params.id;

              let data = {
                fullname: req.body.fullname,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                description: req.body.description,
                id_pekerja,
                id_perekrut: req.body.id_perekrut,
              };
            const { rows } = await hire.insertData(data);
            return response(res, 200, true, rows, "Success masukkan data");   
        } catch (error) {
            console.log(error);
            return response(res, 400, false, error, "insert data gagal");
          }
        },
    updateHire: async (req,res,next)=>{
        hire.updateData(req.params.id,req.body)
        .then((result) =>
        response(res, 200, true, result.rows, "update data success")
      )
      .catch((err) => response(res, 404, false, err.routine, "update data fail"));
    
    },
    delete:(req,res,next)=>{
        hire.deleteData(req.params.id)
        .then((result) =>
        response(res, 200, true, result.rows, "delete data success")
      )
      .catch((err) => response(res, 404, false, err.routine, "delete data fail"));
    },
    getHire: async (req,res,next)=>{
        hire.selectData()
        .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err.routine, "get data fail"));
    },
    getById:  (req, res) => {
      hire
      .selectDataById(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "Get detail hire success")
      )
      .catch((err) =>
        response(res, 404, false, err, "Get detail hire failed")
      );
  },
};

exports.hireController = hireController;