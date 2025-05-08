const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const user = require("./user");
const categories = require("./category");
const tag = require("./tag");

// Define the schema for the Blog model
const CompBlogSchema = new mongoose.Schema(
  {
    // Blog title with trimming, min & max length, and required validation
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    // Unique slug for SEO-friendly URLs with an index for faster searches
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    // Main blog content with required validation and size constraints
   
    // Meta title for SEO purposes
    mtitle: {
      type: String,
    },
    // Meta description for SEO purposes
    mdesc: {
      type: String,
    },
   
    
    // Categories associated with the blog (references 'Category' model)
    categories: { type: ObjectId, ref: "Category", required: true },
    subcategories: { type: ObjectId, ref: "Subcategory", required: true },

    company: [{ type: ObjectId, ref: "Company", required: true }],


    // Tags associated with the blog (references 'Tag' model)
    tags: { type: ObjectId, ref: "Tag", required: true },
   
    // User who posted the blog (references 'User' model)
    postedBy: {
      type: ObjectId,
      ref: "User",
    },

    image: {
      type:String,
     },

    status:{
      type:String,
      default:"Inactive"
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Blog model based on the schema
module.exports = mongoose.model("CompBlog", CompBlogSchema);
