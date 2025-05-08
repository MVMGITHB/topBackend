const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
    },
  
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },


    slug: {
      type: String,
      unique: true,
      index: true,
    },

    status:{
      type:String,
      default:"Inactive"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
