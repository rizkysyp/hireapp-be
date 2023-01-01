const express = require(`express`);
const router = express.Router();
const { UsersController } = require(`../controller/users`);
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
//auth
router.post("/register/:role", UsersController.register);
router.post("/login", UsersController.login);
router.post("/verification", UsersController.verif);

router.put(
  "/update-company",
  upload.single("photo"),
  protect,
  UsersController.updateCompany
);
router.put(
  "/update-employee",
  upload.single("photo"),
  protect,
  UsersController.updateEmployee
);

router.get("/profile", protect, UsersController.profile);
router.get("/employee/all", protect, UsersController.AllEmployee);
module.exports = router;
