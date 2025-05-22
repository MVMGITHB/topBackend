const DropDownForm = require("../models/dropDownForm");

// Create
exports.createDropDownForm = async (req, res) => {
  try {
    const newForm = new DropDownForm(req.body);
    const saved = await newForm.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




// Get All
exports.getAllDropDownForms = async (req, res) => {
  try {
    const forms = await DropDownForm.find().populate("category").populate("subcategory");
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get One
exports.getDropDownFormById = async (req, res) => {
  try {
    const form = await DropDownForm.findById(req.params.id).populate("category").populate("subcategory");
    if (!form) return res.status(404).json({ error: "Not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateDropDownForm = async (req, res) => {
  try {
    const updated = await DropDownForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteDropDownForm = async (req, res) => {
  try {
    const deleted = await DropDownForm.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
