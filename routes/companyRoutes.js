const express = require("express");
const router = express.Router();
const {createCompany,getAllCompanies,getCompanyById,updateCompany,deleteCompany,getCompanyBySubcategoryId,updateStatus,getCompanyByslug} = require("../controllers/companyController");

// CRUD routes
router.post("/createCompany", createCompany);
router.get("/getAllCompany", getAllCompanies);
router.get("/getCompanyById/:id", getCompanyById);
router.get("/getCompanyByslug/:slug", getCompanyByslug);
router.get("/getCompanySubId/:id", getCompanyBySubcategoryId);
router.put("/updateCompany/:id",updateCompany);
router.patch("/updateCompanyStatus/:id", updateStatus);
router.delete("/deleteCompany/:id", deleteCompany);

module.exports = router;
