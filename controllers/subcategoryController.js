const Subcategory = require("../models/subcategory");

// CREATE
exports.createSubcategory = async (req, res) => {
  try {
    const subcategory = new Subcategory(req.body);
    const saved = await subcategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("category", "name") // populate only category name
      .exec();

    // Sort by populated category name
    const sortedSubcategories = subcategories.sort((a, b) => {
      if (a.category.name < b.category.name) return -1;
      if (a.category.name > b.category.name) return 1;
      return 0;
    });

    res.json(sortedSubcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getSubcategoriesByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategories = await Subcategory.find({ category: id });

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories", details: error.message });
  }
};

// READ SINGLE
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate("category", "name");
    if (!subcategory) return res.status(404).json({ error: "Subcategory not found" });
    res.json(subcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateSubcategory = async (req, res) => {
  try {
    const updated = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("category", "name");
    if (!updated) return res.status(404).json({ error: "Subcategory not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateStatus = async (req, res) => {
  try {

    let subcategory = await Subcategory.findById(req.params.id)
   

    if (!subcategory) return res.status(404).json({ error: "Blog not found" });

    if(subcategory.status ==='Inactive')  {
      subcategory.status ='Active'
    }else{
      subcategory.status ='Inactive'
    }

   const subcategories =  await  subcategory.save()

    res.json(subcategories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteSubcategory = async (req, res) => {
  try {
    const deleted = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Subcategory not found" });
    res.json({ message: "Subcategory deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
