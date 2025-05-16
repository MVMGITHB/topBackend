// controllers/dropDownController.js
const DropDown = require("../models/dropDownModel");

exports.createDropDown = async (req, res) => {
  try {
    const dropDown = new DropDown(req.body);
    await dropDown.save();
    res.status(201).json(dropDown);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllDropDowns = async (req, res) => {
  try {
    const dropDowns = await DropDown.find().populate("category");
    res.json(dropDowns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDropDownById = async (req, res) => {
  try {
    const dropDown = await DropDown.findById(req.params.id).populate("category");
    if (!dropDown) return res.status(404).json({ error: "DropDown not found" });
    res.json(dropDown);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDropDown = async (req, res) => {
  try {
    const dropDown = await DropDown.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!dropDown) return res.status(404).json({ error: "DropDown not found" });
    res.json(dropDown);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




exports.updateStatus = async (req, res) => {
  try {

    let dropDown = await DropDown.findById(req.params.id)
   

    if (!dropDown) return res.status(404).json({ error: "Blog not found" });

    if(dropDown.status ==='Inactive')  {
      dropDown.status ='Active'
    }else{
      dropDown.status ='Inactive'
    }

   const dropdown =  await  dropDown.save()

    res.json(dropdown);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDropDown = async (req, res) => {
  try {
    const dropDown = await DropDown.findByIdAndDelete(req.params.id);
    if (!dropDown) return res.status(404).json({ error: "DropDown not found" });
    res.json({ message: "DropDown deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
