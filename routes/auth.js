// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.registerUser);
router.put("/update/:userId", authController.updateUserRole);
router.patch("/updateUser/:id", authController.updateUser);
router.patch("/updateUserStatus/:id", authController.updateStatus);
router.patch("/deleteSpecificuserBLog/:id", authController.deleteUserBlog);
router.get("/singleUser/:id", authController.getSingleUser);
router.get("/singleUserbyslug/:slug", authController.getUserByslug);
router.post("/login", authController.loginUser);
router.get("/getUsers", authController.getAllUser);
router.get("/getAdmin", authController.getAllAdmin);

module.exports = router;
