const Tag = require("../models/tag");
const slugify = require("slugify");

// Create a new tag
exports.createTag = async (req, res) => {
  try {
    const { name, category } = req.body;
    const slug = slugify(name).toLowerCase();
    const tag = new Tag({ name, slug, category });
    const savedTag = await tag.save();
    res.status(201).json(savedTag);
  } catch (err) {
    res.status(400).json({ error: "Tag creation failed", details: err });
  }
};

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().populate("category", "name slug");
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tags", details: err });
  }
};


exports.updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, {...req.body,slug :slugify(req?.body?.name).toLowerCase()}, {
      new: true,
    });
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single tag by slug
exports.getTag = async (req, res) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug }).populate("category", "name slug");
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tag", details: err });
  }
};


exports.updateStatus = async (req, res) => {
  try {

    let Blogs = await Tag.findById(req.params.id)
   

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

// Delete tag
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete({ _id: req.params.id });
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting tag", details: err });
  }
};
