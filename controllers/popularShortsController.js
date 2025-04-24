const PopularShorts = require("../models/PopularShorts");

exports.createPopularShorts = async (req, res) => {
  try {
    const popularShorts = new PopularShorts(req.body);
    await popularShorts.save();
    res.status(201).json(popularShorts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPopularShorts = async (req, res) => {
  try {
    const popularShorts = await PopularShorts.find()
      .populate("compBlog")
      .sort({ createdAt: -1 });
    res.json(popularShorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPopularShortsById = async (req, res) => {
  try {
    const popularShorts = await PopularShorts.findById(req.params.id).populate("compBlog");
    if (!popularShorts) return res.status(404).json({ error: "Not found" });
    res.json(popularShorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePopularShorts = async (req, res) => {
  try {
    const updated = await PopularShorts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("compBlog");
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePopularShorts = async (req, res) => {
  try {
    const deleted = await PopularShorts.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
