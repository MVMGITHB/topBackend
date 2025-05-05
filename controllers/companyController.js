const slugify = require("slugify");
const Company = require("../models/companyModel");

// Create a new company
exports.createCompany = async (req, res) => {
  try {

     
    const company = await Company.create({...req.body,slug: slugify(req.body.slug).toLowerCase()});
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("category")
      .populate("subcategories");
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate("category")
      .populate("subcategories");

    if (!company) return res.status(404).json({ error: "Company not found" });

    res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get a single company by ID
exports.getCompanyByslug = async (req, res) => {
  try {
    const company = await Company.findOne({slug:req.params.slug})
      .populate("category")
      .populate("subcategories");

    if (!company) return res.status(404).json({ error: "Company not found" });

    res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getCompanyBySubcategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.find({ subcategories: id });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories", details: error.message });
  }
};

// Update a company by ID
exports.updateCompany = async (req, res) => {
  try {

    const company = await Company.findByIdAndUpdate(req.params.id, {...req.body,slug: slugify(req.body.slug).toLowerCase()}, {
      new: true,
    });

    if (!company) return res.status(404).json({ error: "Company not found" });
     
    res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {

    let company = await Company.findById(req.params.id)
   

    if (!company) return res.status(404).json({ error: "Blog not found" });

    if(company.status ==='Inactive')  {
      company.status ='Active'
    }else{
      company.status ='Inactive'
    }

   const companies =  await  company.save()

    res.json(companies);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a company by ID
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) return res.status(404).json({ error: "Company not found" });

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
