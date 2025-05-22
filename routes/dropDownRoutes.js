// routes/dropDownRoutes.js
const express = require("express");
const router = express.Router();

const {
  createDropDown,
  getAllDropDowns,
  getDropDownById,
  updateDropDown,
  deleteDropDown,
  updateStatus,
  getDropDownByCategoryId
} = require("../controllers/dropDownController");

router.post("/createDropDown", createDropDown);
router.get("/getAllDropDown", getAllDropDowns);
router.get("/getOneDropDown/:id", getDropDownById);
router.get("/getDropDownByCatId/:categoryId", getDropDownByCategoryId);
router.put("/updateDropDown/:id", updateDropDown);
router.delete("/deleteDropDown/:id", deleteDropDown);
router.patch("/updateDropDownStatus/:id", updateStatus);

module.exports = router;
