const { response } = require(`../middleware/common`);
const { insertExperiences 

} = require("../model/experience")

const experiencesController ={
    Insert: async(req,res,next) => {
        try {
            const {users_id} = req.payload.users_id
            const {
                    position,
                    work_start,
                    work_end,
                    description
                    } = req.body
            const data = {
                users_id,
                position,
                work_end,
                work_start,
                description
            }
            await insertExperiences(data)
            response(res, 200, true, data, "input skill success");
        } catch (error){
            console.log(error);
            response(res, 404, false, "input skill failed");
        }
    }
}

exports.experiencesController = experiencesController