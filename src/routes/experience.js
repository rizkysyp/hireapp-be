const express = require(`express`);
const router = express.Router();
const { protect } = require("../middleware/auth");
const experiencesController = require("../controller/experience")

router.post("/add",protect,experiencesController.experiencesController.Insert)

module.exports = router;