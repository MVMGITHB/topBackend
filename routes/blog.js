const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getblogbyCategory,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  updateBlogById,
  updateStatus,
  getAllBlogsArticle,
  getAllViralStories,
  similarBLog
} = require("../controllers/blog.controller");

// POST ROUTE TO CREATE BLOG    
router.post("/blogs", createBlog);

router.get("/blogs", getAllBlogs);
router.get("/getAllArticle", getAllBlogsArticle);
router.get("/getAllViralStories", getAllViralStories);

router.get("/blogs/:slug", getBlogBySlug);
router.get("/similarBlog/:slug", similarBLog);

// GET blogs by category
router.get("/blogs/category/:categoryId",  getblogbyCategory);


router.put("/blogs/:slug", updateBlog);
router.put("/updateblogs/:id", updateBlogById);
router.patch("/updateBlogStatus/:id", updateStatus);

router.delete("/deleteblogs/:id", deleteBlog);

module.exports = router;
