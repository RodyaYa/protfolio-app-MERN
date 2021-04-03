const router = require("express").Router();
const { check } = require("express-validator");

const { authController } = require("../controllers");
const { authMiddlewares } = require("../middleware");

//routes

router.post(
  "/login",
  [
    check("email", "Enter correct email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  authController.login
);
router.post(
  "/register",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Min password length 6 symbols").isLength({ min: 6 }),
    check("login", "Enter name").exists(),
  ],
  authMiddlewares.checkIsUserPresentByEmail,
  authController.register
);
router.post("/logout", authController.logout);

//routes end

module.exports = router;
