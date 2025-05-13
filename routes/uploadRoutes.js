const express = require('express');
const router = express.Router();
const upload = require('../middleware/single');
const { uploadImage } = require("../controllers/uploadControler");

// Route to handle media uploads
router.post("/uploadImage", upload.single("image"), uploadImage);

module.exports = router;
