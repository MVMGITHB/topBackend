const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const topsShortsSchema = new mongoose.Schema(
  {
    compBlog: [
      {
        type: ObjectId,
        ref: "CompBlog",
        // required: true,
      },
    ],

    blog: [
      {
        type: ObjectId,
        ref: "Blog",
        // required: true,
      },
    ],


    page: {
        type: String,
      },

    status: {
      type: String,
      default: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TopsShorts", topsShortsSchema);
