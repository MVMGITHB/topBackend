const TrendingShorts = require("../models/trendingshortsmodel");

// CREATE
exports.addTrendingShort = async (req, res) => {
  try {
    const { compBlog, page, status,blog } = req.body;

    const newTrending = new TrendingShorts({
      compBlog,
      page,
      blog,
      status,
    });

    const saved = await newTrending.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating trending short:", error);
    res.status(500).json({ error: "Failed to create trending short." });
  }
};

// READ ALL
exports.getTrendingShorts = async (req, res) => {
  try {
    const trending = await TrendingShorts.find().populate("compBlog").populate({
        path: "compBlog",
        populate: [
          { path: "categories", model: "Category" },
          { path: "subcategories", model: "Subcategory" },
          { path: "company", model: "Company", select: "logo" },
          // { path: "tags", model: "Tag" },
          // { path: "postedBy", model: "User" },
        ],
      }).populate({
        path: "blog",
        populate: [
          { path: "categories", model: "Category" },
          { path: "subcategories", model: "Subcategory" },
          { path: "tags", model: "Tag" },
          { path: "postedBy", model: "User", select: "name" },
        ],
      })
      .sort({ createdAt: -1 });;
    res.status(200).json(trending);
  } catch (error) {
    console.error("Error fetching trending shorts:", error);
    res.status(500).json({ error: "Failed to fetch trending shorts." });
  }
};

// READ ONE
exports.getTrendingShortById = async (req, res) => {
  try {
    const trending = await TrendingShorts.findById(req.params.id).populate("compBlog");
    if (!trending) {
      return res.status(404).json({ error: "Trending short not found." });
    }
    res.status(200).json(trending);
  } catch (error) {
    console.error("Error fetching trending short:", error);
    res.status(500).json({ error: "Failed to fetch trending short." });
  }
};

// UPDATE
exports.updateTrendingShort = async (req, res) => {
  try {
    const updated = await TrendingShorts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("compBlog");

    if (!updated) {
      return res.status(404).json({ error: "Trending short not found." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating trending short:", error);
    res.status(500).json({ error: "Failed to update trending short." });
  }
};

// DELETE
exports.deleteTrendingShort = async (req, res) => {
  try {
    const deleted = await TrendingShorts.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Trending short not found." });
    }
    res.status(200).json({ message: "Trending short deleted successfully." });
  } catch (error) {
    console.error("Error deleting trending short:", error);
    res.status(500).json({ error: "Failed to delete trending short." });
  }
};
