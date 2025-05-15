// controllers/compBlogController.js
const CompBlog = require("../models/CompBlog");
const Category = require("../models/category")
const slugify = require("slugify");
const Subcategory = require("../models/subcategory");
const Blog = require("../models/blog");

const Company = require("../models/companyModel");


// heading:{
//       type:String,
//     },
//     subHeading:{
//       type:String,
//     },
//     para:{
//       type:String,
//     },
// CREATE
exports.createCompBlog = async (req, res) => {
  try {
    const { title, mtitle, mdesc, categories, subcategories, company, tags, postedBy,image,faqs,body,slug ,heading,subHeading,para} = req.body;

    const compBlog = await CompBlog.create({
      title,
      slug: slugify(slug).toLowerCase(),
      mtitle,
      mdesc,
      categories,
      subcategories,
      company,
      tags,
      postedBy,
      image,
      faqs,
      body,
      heading,subHeading,para
    });

    res.status(201).json(compBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.filterbysubcateory=async(req,res)=>{
    try {

       const { slug } = req.params;


    const Subcategorys = await Subcategory.findOne({ slug: slug });

    if (!Subcategorys) {
      return res.status(404).json({ error: "Category not found" });
    }


     const compblogs = await CompBlog.find({subcategories:Subcategorys?._id})
    .populate("subcategories")

     const blogs = await Blog.find({subcategories:Subcategorys?._id})
    .populate("subcategories")

    const blogsdata = [...compblogs,blogs]

    res.status(200).json(blogsdata)


      
    } catch (error) {
      res.status(400).json({ error: error.message });
    console.log(error)
    }
}


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


exports.filterBLog1 = async(req,res)=>{
  try {
    const { slug } = req.params;


    const category = await Category.findOne({ slug: slug });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    console.log(category._id)


    const subcategory = await Subcategory.find({category:category?._id})

const result = await Promise.all(
      subcategory.map(async (subcat) => {
        const compBlogs = await CompBlog.find({ subcategories: subcat._id })
          .populate("categories", "name slug")
          .populate("tags", "name slug")
          .populate("subcategories", "name slug")
          .populate("postedBy", "username email slug")
          .sort({ createdAt: -1 });

        const blogs = await Blog.find({ subcategories: subcat._id })
          // Add condition here if you want to filter blogType (e.g., blogType: 'article')
          .populate("categories", "name slug")
          .populate("tags", "name slug")
          .populate("subcategories", "name slug")
          .populate("postedBy", "username email slug")
          .sort({ createdAt: -1 });

        return {
          subcategory: subcat,
          compBlogs,
          blogs
        };
      })
    );






    res.json(result);
    


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
    console.log(error)
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

    // console.log(blog)
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// exports.commonSearch = async (req, res) => {
//   try {
//     const { q } = req.query;

//     if (!q || q.trim() === "") {
//       return res.status(400).json({ error: "Search query (q) is required." });
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex chars
//     const regex = new RegExp(escapedQuery, "i");

//     const companies = await Company.find({
//       $or: [
//         { websiteName: regex },
//         { review: regex },
//         { features: regex },
//         { mainHeading: regex },
//         { Description: regex },
//         { pros: regex },
//         { cons: regex },
//       ],
//     });

//     const blogs = await Blog.find({
//       $or: [
//         { title: regex },
//         { body: regex },
//         { excerpt: regex },
//         { mtitle: regex },
//         { mdesc: regex },
//       ],
//     }).populate("categories subcategories tags postedBy");

//     const compBlogs = await CompBlog.find({
//       $or: [
//         { title: regex },
//         { body: regex },
//         { mtitle: regex },
//         { mdesc: regex },
//         { heading: regex },
//         { subHeading: regex },
//         { para: regex },
//       ],
//     }).populate("categories subcategories tags postedBy company");

//     res.json({ companies, blogs, compBlogs });
//   } catch (error) {
//     console.error("Search failed:", error);
//     res.status(500).json({ error: "Search failed" });
//   }
// };




// exports.commonSearch = async (req, res) => {
//   try {
//     const { q } = req.query;

//     if (!q || q.trim() === "") {
//       return res.status(400).json({ error: "Search query (q) is required." });
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     const regex = new RegExp(escapedQuery, "i");

//     // 1. Companies (direct search)
//     const companies = await Company.find({
//       $or: [
//         { websiteName: regex },
//         { review: regex },
//         { features: regex },
//         { mainHeading: regex },
//         { Description: regex },
//         { pros: regex },
//         { cons: regex },
//       ],
//     });

//     // 2. Blogs (including populated fields)
//     const blogsRaw = await Blog.find({
//       $or: [
//         { title: regex },
//         { body: regex },
//         { excerpt: regex },
//         { mtitle: regex },
//         { mdesc: regex },
//       ],
//     })
//       .populate("categories")
//       .populate("subcategories")
//       .populate("tags")
//       .populate("postedBy");

//     const blogs = blogsRaw.filter(blog =>
//       regex.test(blog?.categories?.name || "") ||
//       regex.test(blog?.subcategories?.name || "") ||
//       regex.test(blog?.tags?.name || "") ||
//       regex.test(blog?.postedBy?.name || "") ||
//       regex.test(blog.title) ||
//       regex.test(blog.body) ||
//       regex.test(blog.excerpt) ||
//       regex.test(blog.mtitle) ||
//       regex.test(blog.mdesc)
//     );

//     // 3. CompBlogs (including populated fields)
//     const compBlogsRaw = await CompBlog.find({
//       $or: [
//         { title: regex },
//         { body: regex },
//         { mtitle: regex },
//         { mdesc: regex },
//         { heading: regex },
//         { subHeading: regex },
//         { para: regex },
//       ],
//     })
//       .populate("categories")
//       .populate("subcategories")
//       .populate("tags")
//       .populate("postedBy")
//       .populate("company");

//   const compBlogs = compBlogsRaw.filter(comp =>
//   regex.test(comp?.categories?.name || "") ||
//   regex.test(comp?.subcategories?.name || "") ||
//   regex.test(comp?.tags?.name || "") ||
//   regex.test(comp?.postedBy?.name || "") ||
//   regex.test(comp.title) ||
//   regex.test(comp.body) ||
//   regex.test(comp.mtitle) ||
//   regex.test(comp.mdesc) ||
//   regex.test(comp.heading) ||
//   regex.test(comp.subHeading) ||
//   regex.test(comp.para) ||
//   comp.company?.some(c =>
//     regex.test(c?.websiteName || "") ||
//     regex.test(c?.review || "") ||
//     (c?.features || []).some(f => regex.test(f)) ||
//     regex.test(c?.mainHeading || "") ||
//     regex.test(c?.Description || "") ||
//     (c?.pros || []).some(p => regex.test(p)) ||
//     (c?.cons || []).some(n => regex.test(n)) ||
//     (c?.benifits || []).some(b => regex.test(b)) ||
//     regex.test(c?.logo || "")
//   )
// );


//     res.json({ companies, blogs, compBlogs });
//   } catch (error) {
//     console.error("Search failed:", error);
//     res.status(500).json({ error: "Search failed" });
//   }
// };



exports.commonSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Search query (q) is required." });
    }

    // Escape regex special characters in the query string
    const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, "i");

    // 1. Search Companies directly by fields
    const companies = await Company.find({
      $or: [
        { websiteName: regex },
        { review: regex },
        { features: regex },
        { mainHeading: regex },
        { Description: regex },
        { pros: regex },
        { cons: regex },
      ],
    });

    // 2. Search Blogs and filter based on populated fields & text fields
    const blogsRaw = await Blog.find({
      $or: [
        { title: regex },
        { body: regex },
        { excerpt: regex },
        { mtitle: regex },
        { mdesc: regex },
      ],
    })
      .populate("categories")
      .populate("subcategories")
      .populate("tags")
      .populate("postedBy");

    const blogs = blogsRaw.filter(blog =>
      regex.test(blog?.categories?.name || "") ||
      regex.test(blog?.subcategories?.name || "") ||
      regex.test(blog?.tags?.name || "") ||
      regex.test(blog?.postedBy?.name || "") ||
      regex.test(blog.title) ||
      regex.test(blog.body) ||
      regex.test(blog.excerpt) ||
      regex.test(blog.mtitle) ||
      regex.test(blog.mdesc)
    );

    // 3. Search CompBlogs and filter based on its own fields and populated company fields
    const compBlogsRaw = await CompBlog.find({
      $or: [
        { title: regex },
        { body: regex },
        { mtitle: regex },
        { mdesc: regex },
        { heading: regex },
        { subHeading: regex },
        { para: regex },
      ],
    })
      .populate("categories")
      .populate("subcategories")
      .populate("tags")
      .populate("postedBy")
      .populate("company");

    const compBlogs = compBlogsRaw.filter(comp => {
      const companies = Array.isArray(comp.company) ? comp.company : [];

      const matchesCompany = companies.some(c =>
        regex.test(c?.websiteName || "") ||
        regex.test(c?.review || "") ||
        (c?.features || []).some(f => regex.test(f)) ||
        regex.test(c?.mainHeading || "") ||
        regex.test(c?.Description || "") ||
        (c?.pros || []).some(p => regex.test(p)) ||
        (c?.cons || []).some(n => regex.test(n)) ||
        (c?.benifits || []).some(b => regex.test(b)) ||
        regex.test(c?.logo || "")
      );

      const matchesCompBlog =
        regex.test(comp?.categories?.name || "") ||
        regex.test(comp?.subcategories?.name || "") ||
        regex.test(comp?.tags?.name || "") ||
        regex.test(comp?.postedBy?.name || "") ||
        regex.test(comp.title) ||
        regex.test(comp.body) ||
        regex.test(comp.mtitle) ||
        regex.test(comp.mdesc) ||
        regex.test(comp.heading) ||
        regex.test(comp.subHeading) ||
        regex.test(comp.para);

      return matchesCompany || matchesCompBlog;
    });

    // Return combined results
    res.json({ companies, blogs, compBlogs });
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ error: "Search failed" });
  }
};









// UPDATE
exports.updateCompBlog = async (req, res) => {
  try {
    const updatedBlog = await CompBlog.findByIdAndUpdate(
      { _id: req.params.slug },
      {...req.body,slug: slugify(req?.body?.slug).toLowerCase()},
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


