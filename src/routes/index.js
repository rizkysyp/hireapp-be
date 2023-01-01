const express = require("express");
const router = express.Router();
const UsersRouter = require("../routes/users")
const HireRouter = require("./../routes/hire")

router
.use("/users", UsersRouter)
.use('/hire', HireRouter);

module.exports = router;
