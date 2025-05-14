// routes/compBlogRoutes.js
const express = require("express");
const router = express.Router();
const {createCompBlog,getAllCompBlogs,getCompBlogBySlug,updateCompBlog,deleteCompBlog,filterBLog,updateStatus,filterbysubcateory,filterBLog1} = require("../controllers/CompBlogController");

router.post("/createCompblogs", createCompBlog);
router.get("/getALlcompblogs", getAllCompBlogs);
router.get("/filter/:slug", filterBLog);
router.get("/filter1/:slug", filterBLog1);
router.get("/filterBlog/:slug", filterbysubcateory);
router.get("/getOnecompblogs/:slug", getCompBlogBySlug);
router.put("/updatecompblogs/:slug", updateCompBlog);
router.patch("/updateCompStatus/:id", updateStatus);
router.delete("/deletecompblogs/:slug", deleteCompBlog);

module.exports = router;