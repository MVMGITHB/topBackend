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

// Delete tag
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findOneAndDelete({ slug: req.params.slug });
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting tag", details: err });
  }
};
