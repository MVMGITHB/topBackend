const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const webstieComparison = require("./routes/comparison");
const category = require("./routes/category");
const subcategory = require("./routes/subcategoryRoutes");
const tag = require("./routes/tag")
const company = require("./routes/companyRoutes")
const compBlog = require("./routes/compBlogRoutes")
const topsShortsRoutes = require("./routes/topsShortsRoutes");
const trendingRoutes = require("./routes/trendingRoute")
const topHeadingRoutes = require("./routes/topsHeadingShortsRoute")
const uploadRoutes = require('./routes/uploadRoutes'); 





const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://tops-admin-panel.vercel.app/",
  "https://tops-admin-panel.vercel.app",
  "http://localhost:3000",
  "https://top5shots-2kuz.vercel.app/",
  "https://top5shots-2kuz.vercel.app",
  "http://82.25.109.68:3000/",
  "http://82.25.109.68:3000",
  "http://top5shots.com",
  "http://top5shots.com/",
  "https://top5shots.com/",
  "https://top5shots.com",
  "https://www.top5shots.com/",
  "https://www.top5shots.com"
]);

// CORS middleware setup
app.use(
  cors({
    origin: (origin, callback) => {
      // If origin is undefined (like Postman or curl), allow it
      
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        // console.log("Origin:", origin);
      } else {
        console.warn("Blocked CORS request from:", origin);
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true, // Allows cookies and session headers
  })
);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use(express.json());
app.use(authRoutes);
app.use(blogRoutes);
app.use(webstieComparison);
app.use(category);
app.use(subcategory);
app.use(tag)
app.use(company)
app.use(compBlog)
app.use("/api/tops-shorts", topsShortsRoutes);
app.use("/api/trending-shorts", trendingRoutes);
app.use("/api/topHeading-shorts", topHeadingRoutes);
app.use('/api', uploadRoutes);




cloudinary.config({
  cloud_name: "dfim2ipdh",
  api_key: "495874135955515",
  api_secret: "kglCYM7kNvpEImAhr-va9sUyb-M",
});

// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret,
// });

// Local storage config for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Image upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Image upload failed", details: error.message });
    console.error(error);
  }
});



app.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: true, msg: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    // ✅ Return what Jodit expects
    res.json({
      files: [
        {
          url: result.secure_url,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Image upload failed",
      details: error.message,
    });
    console.error(error);
  }
});


// Database Connection
const databaseConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error(" Database Connection Failed", error);
    process.exit(1);
  }
};

databaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
  });
});
