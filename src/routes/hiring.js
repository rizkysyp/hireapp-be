const express = require("express");
const router = express.Router();
const { hireController } = require("./../controller/hiring");
const { protect } = require("../middleware/auth");

router.post("/:id", protect, hireController.addHire);
router.get("/list", protect, hireController.getHire);
router.get("/chat/:id", protect, hireController.getChat);
router.post("/post-chat/:id", protect, hireController.postChat);

module.exports = router;
