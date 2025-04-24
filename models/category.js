const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
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

    status:{
      type:String,
      default:"Inactive"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
