// backend/controllers/uploadController.js
const path = require('path');
const multer = require('multer');

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Path to store the uploaded files
  },
  filename: (req, file, cb) => {
    // Set unique filename using timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with storage settings
const upload = multer({ storage });

// Upload media function
const uploadMedia = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Generate file URL (relative path to the 'uploads' folder)
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Return the response in the format expected by the frontend
    res.json({
      success: 1, // Success flag for JoditEditor or similar editor
      file: {
        url: fileUrl, // Image URL
      },
    });
  });
};

// Export function
module.exports = { uploadMedia };
