const express= require("express");
const router= express.Router();
const userController= require("../controllers/userController.js");
const authVerificationUser = require("../middlewares/authVerificationUser.js");
//User Routes
router.post("/user-register", userController.register);
router.post("/user-login", userController.login);
router.get("/user", authVerificationUser, userController.user);
router.get("/user-verification", authVerificationUser, userController.userVerification);
router.get("/user-logout", authVerificationUser, userController.logout);

module.exports= router;