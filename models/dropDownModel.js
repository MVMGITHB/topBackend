// models/DropDown.js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const dropDownSchema = new mongoose.Schema(
  {
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    dropDown: [
      {
        Head: {
          type: String,
        },
        drop: {
          type: [String],
          default: [],
        },
      },
    ],
    status: {
      type: String,
      default: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DropDown", dropDownSchema);
