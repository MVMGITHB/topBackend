const Blog = require("../models/blog");
const Categories = require("../models/category");
const slugify = require("slugify");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title } = req.body;

    const blog = new Blog({
      ...req.body,
      slug: slugify(req.body.slug).toLowerCase(),
    });

    await blog.save();
    res.status(201).json(blog);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("categories", "name slug")
      .populate("tags", "name slug")
      .populate("subcategories", "name")
      .populate("postedBy", "username email slug") // Only get username and email
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getblogbyCategory =  async (req, res) => {
  const { categoryId } = req.params;

  try {
    const blogs = await Blog.find({ "categories._id": categoryId }).populate("categories");
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}


// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate("categories", "name slug")
      .populate("tags", "name slug")
      .populate("subcategories", "name")
      .populate("postedBy", "username email slug");

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Update a blog by slug
exports.updateBlog = async (req, res) => {
  try {
    const updateBlog = await Blog.findOneAndUpdate(
      { slug: req.params.slug }, // filter
      req.body,                  // update
      { new: true, runValidators: true } // options
    );

    if (!updateBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(updateBlog); // return updated blog
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


exports.updateBlogById = async (req, res) => {
  try {
    const updateBlog = await Blog.findByIdAndUpdate(
      { _id: req.params.id }, // filter
      req.body,                  // update
      { new: true, runValidators: true } // options
    );

    if (!updateBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(updateBlog); // return updated blog
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


exports.updateStatus = async (req, res) => {
  try {

    let Blogs = await Blog.findById(req.params.id)
   

    if (!Blogs) return res.status(404).json({ error: "Blog not found" });

    if(Blogs.status ==='Inactive')  {
      Blogs.status ='Active'
    }else{
      Blogs.status ='Inactive'
    }

   const blogs =  await  Blogs.save()

    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
   const blog = await Blog.findByIdAndDelete({ _id: req.params.id });
   if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};