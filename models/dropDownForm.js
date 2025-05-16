const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const dropDownFormSchema = new mongoose.Schema(
  {
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    field1: { type: String },
    field2: { type: String },
    field3: { type: String },
    field4: { type: String },
    field5: { type: String },
    field6: { type: String },
    status: {
      type: String,
      default: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DropDownForm", dropDownFormSchema);
