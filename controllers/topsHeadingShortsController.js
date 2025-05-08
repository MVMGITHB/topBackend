const TopsHeadingShorts = require("../models/topHeadingModel");

// CREATE
exports.addTopsHeadingShort = async (req, res) => {
  try {
    const { compBlog, page, status } = req.body;

    const newDoc = new TopsHeadingShorts({ compBlog, page, status });
    const saved = await newDoc.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating TopsHeadingShort:", err);
    res.status(500).json({ error: "Failed to create TopsHeadingShort." });
  }
};

// READ ALL
exports.getTopsHeadingShorts = async (req, res) => {
  try {
    const data = await TopsHeadingShorts.find().populate("compBlog");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching TopsHeadingShorts:", err);
    res.status(500).json({ error: "Failed to fetch TopsHeadingShorts." });
  }
};

// READ ONE
exports.getTopsHeadingShortById = async (req, res) => {
  try {
    const doc = await TopsHeadingShorts.findById(req.params.id).populate("compBlog");
    if (!doc) return res.status(404).json({ error: "Not found." });

    res.status(200).json(doc);
  } catch (err) {
    console.error("Error fetching TopsHeadingShort:", err);
    res.status(500).json({ error: "Failed to fetch TopsHeadingShort." });
  }
};

// UPDATE
exports.updateTopsHeadingShort = async (req, res) => {
  try {
    const updated = await TopsHeadingShorts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("compBlog");

    if (!updated) return res.status(404).json({ error: "Not found." });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating TopsHeadingShort:", err);
    res.status(500).json({ error: "Failed to update TopsHeadingShort." });
  }
};

// DELETE
exports.deleteTopsHeadingShort = async (req, res) => {
  try {
    const deleted = await TopsHeadingShorts.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found." });

    res.status(200).json({ message: "Deleted successfully." });
  } catch (err) {
    console.error("Error deleting TopsHeadingShort:", err);
    res.status(500).json({ error: "Failed to delete TopsHeadingShort." });
  }
};
