const express = require("express");
const router = express.Router();
const {
  createDropDownForm,
  getAllDropDownForms,
  getDropDownFormById,
  updateDropDownForm,
  deleteDropDownForm,
} = require("../controllers/dropDownFormController");

router.post("/createDropDownForm", createDropDownForm);
router.get("/getALlDropDownFormData", getAllDropDownForms);
router.get("/getOneDropDownData/:id", getDropDownFormById);
router.put("/updateDropDownForm/:id", updateDropDownForm);
router.delete("/deleteDropDownFOrm/:id", deleteDropDownForm);

module.exports = router;
