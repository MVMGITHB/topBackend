const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },


    category: {
      type: ObjectId,
      ref: "Category", // Make sure this matches your actual Category model name
    },


    status: {
      type: String,
      default: "Inactive",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
