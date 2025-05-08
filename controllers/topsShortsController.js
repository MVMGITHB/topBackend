const TopsShorts = require("../models/topsShortsModel");

exports.createTopsShorts = async (req, res) => {
  try {
    const topsShorts = new TopsShorts(req.body);
    await topsShorts.save();
    res.status(201).json(topsShorts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTopsShorts = async (req, res) => {
  try {
    const topsShorts = await TopsShorts.find()
      .populate({
        path: "compBlog",
        populate: [
          { path: "categories", model: "Category" },
          { path: "subcategories", model: "Subcategory" }, // ✅ Add this line
          { path: "company", model: "Company", select: "logo" },
          // { path: "tags", model: "Tag" },
          // { path: "postedBy", model: "User" },
        ],
      })
      .sort({ createdAt: -1 });

    res.json(topsShorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  

exports.getTopsShortsById = async (req, res) => {
  try {
    const topsShorts = await TopsShorts.findById(req.params.id).populate("compBlog");
    if (!topsShorts) return res.status(404).json({ error: "Not found" });
    res.json(topsShorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTopsShorts = async (req, res) => {
  try {
    const updated = await TopsShorts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("compBlog");
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.updateStatus = async (req, res) => {
  try {

    let TopsShort = await TopsShorts.findById(req.params.id)
   

    if (!TopsShort) return res.status(404).json({ error: "Blog not found" });

    if(TopsShort.status ==='Inactive')  {
      TopsShort.status ='Active'
    }else{
      TopsShort.status ='Inactive'
    }

   const topsShort =  await  TopsShort.save()

    res.json(topsShort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteTopsShorts = async (req, res) => {
  try {
    const deleted = await TopsShorts.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
