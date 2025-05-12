// backend/routes/upload.js
const express = require('express');
const router = express.Router();
const { uploadMedia } = require('../controllers/upload1Controller');

// Route to handle media uploads
router.post('/media', uploadMedia);

module.exports = router;
