const express= require("express");
const router= express.Router();
const userController= require("../controllers/userController.js");
const blogController= require("../controllers/blogController.js");
const fileController= require("../controllers/fileController.js")
const fileUpload= require("../middlewares/fileupload.js");
const authVerificationUser = require("../middlewares/authVerificationUser.js");


//User Routes
router.post("/user-register", userController.register);
router.post("/user-login", userController.login);
router.get("/user", authVerificationUser, userController.user);
router.get("/user-verification", authVerificationUser, userController.userVerification);
router.get("/user-logout", authVerificationUser, userController.logout);
router.put("/user-update", authVerificationUser, userController.update);


//Blog Routes
router.post("/create-blog", authVerificationUser, fileUpload, blogController.createBlog);
router.get("/blogs", authVerificationUser, blogController.getAllBlogs);
router.get("/single-blog/:id", authVerificationUser, blogController.getBlogById);
router.put("/update-blog/:id", authVerificationUser, blogController.updateBlog);
router.delete("/delete-blog/:id", authVerificationUser, blogController.deleteBlog);

module.exports= router;