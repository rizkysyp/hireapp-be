const express = require(`express`);
const router = express.Router();
const { protect } = require("../middleware/auth");
const portofolioController = require("../controller/portofolio")
const upload = require("../middleware/upload");


router.post("/add",upload.single("photo"),protect,portofolioController.portofolioController.Insert)
router.get("/get",protect,portofolioController.portofolioController.Get)
router.delete("/delete",portofolioController.portofolioController.Delete)
router.put("/edit",upload.single("photo"),protect,portofolioController.portofolioController.Put)

module.exports = router;