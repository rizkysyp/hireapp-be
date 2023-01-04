const express = require("express");
const router = express.Router();
const { experienceController } = require("./../controller/experience");
const { protect } = require("../middleware/auth");

router.post("/", protect, experienceController.insert);
router.get("/", protect, experienceController.getExperience);
router.put("/:id", experienceController.update);
router.get("/detail/:id", experienceController.getById);
router.delete("/:id", experienceController.delete);
router.get("/:id", protect, experienceController.getExperienceParams);
module.exports = router;

module.exports = router;
