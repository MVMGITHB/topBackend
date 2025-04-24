const WebsiteComparison = require("../models/comparison");

// Create a new website comparison
exports.createWebsiteComparison = async (req, res) => {
  try {
    const website = new WebsiteComparison(req.body);
    const saved = await website.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({
      error: "Failed to create website comparison",
      details: err.message,
    });
  }
};

// Get all website comparisons
exports.getAllComparisons = async (req, res) => {
  try {
    const comparisons = await WebsiteComparison.find()
      .find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.json(comparisons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comparisons" });
  }
};

// Get a single website comparison by ID
exports.getComparisonById = async (req, res) => {
  try {
    const comparison = await WebsiteComparison.findById(req.params.id);
    if (!comparison) {
      return res.status(404).json({ error: "Website comparison not found" });
    }
    res.json(comparison);
  } catch (err) {
    res.status(500).json({ error: "Error fetching website comparison" });
  }
};

// Update a website comparison by ID
exports.updateComparison = async (req, res) => {
  try {
    const updated = await WebsiteComparison.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updated) {
      return res.status(404).json({ error: "Website comparison not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({
      error: "Failed to update website comparison",
      details: err.message,
    });
  }
};

// Delete a website comparison by ID
exports.deleteComparison = async (req, res) => {
  try {
    const deleted = await WebsiteComparison.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Website comparison not found" });
    }
    res.json({ message: "Website comparison deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete website comparison" });
  }
};
