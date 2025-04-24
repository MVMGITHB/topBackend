// controllers/categoryController.js
const Category = require("../models/category");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const slug = slugify(name, { lower: true });

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await new Category({ name, slug }).save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};


// 


// CREATE a new category
// exports.createCategory = async (req, res) => {
//   try {
//     const category = new Category(req.body);
//     const savedCategory = await category.save();
//     res.status(201).json(savedCategory);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // GET all categories
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find().sort({ createdAt: -1 });
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// GET a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a category
exports.updateCategory = async (req, res) => {
  try {

    const slug = slugify(req.body.name, { lower: true });
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: {...req.body,slug} },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) return res.status(404).json({ error: "Category not found" });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateStatus = async (req, res) => {
  try {

    let category = await Category.findById(req.params.id)
   

    if (!category) return res.status(404).json({ error: "Blog not found" });

    if(category.status ==='Inactive')  {
      category.status ='Active'
    }else{
      category.status ='Inactive'
    }

   const categories =  await  category.save()

    res.json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






