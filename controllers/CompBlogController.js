// controllers/compBlogController.js
const CompBlog = require("../models/CompBlog");
const Category = require("../models/category")
const slugify = require("slugify");

// CREATE
exports.createCompBlog = async (req, res) => {
  try {
    const { title, mtitle, mdesc, categories, subcategories, company, tags, postedBy } = req.body;

    const compBlog = await CompBlog.create({
      title,
      slug: slugify(title).toLowerCase(),
      mtitle,
      mdesc,
      categories,
      subcategories,
      company,
      tags,
      postedBy,
    });

    res.status(201).json(compBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.filterBLog = async(req,res)=>{
  try {
    const { slug } = req.params;


    const category = await Category.findOne({ slug: slug });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    console.log(category._id)


    const blogs = await CompBlog.find({categories:category?._id})
    .populate("subcategories")

    console.log(blogs)
  
  
    const result = [];

    blogs.forEach(item => {
      const subcatId = item?.subcategories?._id;
      const existing = result?.find(r => r?.subcategories?._id?.toString() === subcatId?.toString());
    
      if (existing) {
        existing.items.push(item);
      } else {
        const data = {
          subcategories: item?.subcategories,
          items: [item]
        };
        result.push(data);
      }
    });
    


  // return result;
    
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error)
  }
}



// READ ALL
exports.getAllCompBlogs = async (req, res) => {
  try {
    const blogs = await CompBlog.find()
      .populate("categories")
      .populate("subcategories")
      .populate("company")
      .populate("tags")
      .populate("postedBy");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// READ ONE
exports.getCompBlogBySlug = async (req, res) => {
  try {
    const blog = await CompBlog.findOne({ slug: req.params.slug })
      .populate("categories")
      .populate("subcategories")
      .populate("company")
      .populate("tags")
      .populate("postedBy");

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateCompBlog = async (req, res) => {
  try {
    const updatedBlog = await CompBlog.findByIdAndUpdate(
      { _id: req.params.slug },
      req.body,
      { new: true }
    )
      .populate("categories")
      .populate("subcategories")
      .populate("company")
      .populate("tags")
      .populate("postedBy");

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.updateStatus = async (req, res) => {
  try {

    let compBlog = await CompBlog.findById(req.params.id)
   

    if (!compBlog) return res.status(404).json({ error: "Blog not found" });

    if(compBlog.status ==='Inactive')  {
      compBlog.status ='Active'
    }else{
      compBlog.status ='Inactive'
    }

   const blog =  await  compBlog.save()

    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteCompBlog = async (req, res) => {
  try {
    const deleted = await CompBlog.findByIdAndDelete({ _id: req.params.slug });
    if (!deleted) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


