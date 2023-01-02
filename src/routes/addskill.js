const express = require(`express`);
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const addSkillController = require("../controller/addskill")

router.post("/add",protect, addSkillController.addSkillController.Insert);
router.delete("/delete",protect,addSkillController.addSkillController.Delete)
router.get("/get",protect,addSkillController.addSkillController.Get)


module.exports = router;