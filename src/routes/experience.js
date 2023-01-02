const express = require("express");
const router = express.Router();
const { experienceController } = require("./../controller/experience");
const { protect } = require("../middleware/auth");


router.post("/", protect, experienceController.insert);
router.get("/", experienceController.getExperience);
router.put("/:id", experienceController.update);
router.get("/get-experience/:id", experienceController.getById);
router.delete("/:id", experienceController.delete);
module.exports = router;
