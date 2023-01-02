const express = require("express");
const router = express.Router();
const UsersRouter = require("../routes/users");
const AddSkillRouter = require("../routes/addskill")
const ExperienceRouter = require("../routes/experience")
const PortofolioRouter = require("../routes/portofolio")

router.use("/users", UsersRouter);
router.use("/skill", AddSkillRouter)
router.use("/experience",ExperienceRouter)
router.use("/portofolio",PortofolioRouter)

module.exports = router;
