// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.registerUser);
router.put("/update/:userId", authController.updateUserRole);
router.patch("/updateUserStatus/:id", authController.updateStatus);
router.get("/singleUser/:id", authController.getSingleUser);
router.post("/login", authController.loginUser);
router.get("/getUsers", authController.getAllUser);
router.get("/getAdmin", authController.getAllAdmin);

module.exports = router;
