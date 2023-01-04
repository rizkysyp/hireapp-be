const express = require(`express`);
const router = express.Router();
const { protect } = require("../middleware/auth");
const portofolioController = require("../controller/portofolio");
const upload = require("../middleware/upload");

router.post(
  "/add",
  upload.single("photo"),
  protect,
  portofolioController.portofolioController.Insert
);
router.get("/get", protect, portofolioController.portofolioController.Get);
router.delete("/delete/:id", portofolioController.portofolioController.Delete);
router.put(
  "/edit/:id",
  upload.single("photo"),
  protect,
  portofolioController.portofolioController.Put
);
router.get("/detail/:id", portofolioController.portofolioController.detail);
router.get(
  "/:id",
  protect,
  portofolioController.portofolioController.GetByParams
);
module.exports = router;
