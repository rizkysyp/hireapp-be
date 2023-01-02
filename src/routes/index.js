const express = require("express");
const router = express.Router();
const UsersRouter = require("../routes/users")
const HireRouter = require("./../routes/hire")
const ExperienceRouter = require("./../routes/experience")

router
.use("/users", UsersRouter)
.use('/hire', HireRouter)
.use('/experience', ExperienceRouter);

module.exports = router;
