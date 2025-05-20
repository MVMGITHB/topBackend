const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const user = require("./user");
const categories = require("./category");
const tag = require("./tag");

// Define the schema for the Blog model
const blogSchema = new mongoose.Schema(
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
    body: {
      type: String,
      required: true,
      
    },
    // Short excerpt of the blog (optional) with a maximum length
    excerpt: {
      type: String,
      max: 1000,
    },
    // Meta title for SEO purposes
    mtitle: {
      type: String,
    },
    // Meta description for SEO purposes
    mdesc: {
      type: String,
    },
    // Blog cover image stored as binary data with its content type
    
    image: {
     type:String,
    },
    // Categories associated with the blog (references 'Category' model)
    categories: { type: ObjectId, ref: "Category", required: true },
    subcategories: { type: ObjectId, ref: "Subcategory", required: true },
    // Tags associated with the blog (references 'Tag' model)
    tags: { type: ObjectId, ref: "Tag", required: true },
    // Number of times the blog has been marked as favorite, defaults to 0
    favoritesCount: { type: Number, default: 0 },
    // User who posted the blog (references 'User' model)
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    status:{
      type:String,
      default:"Inactive"
    },


     blogType:{
            type:String,
            enum:['viral stories','article'],
            trim: true
          },



     imageType:{
            type:String,
            enum:['imageType','storiesType'],
            trim: true
          },


     blogType1:{
            type:String,
            enum:['blog','stories'],
            trim: true
          },

          conclusion:{
             type :String,
          },



    faqs: [
      {
        ques: {
          type: String,
          required: true
        },
        ans: {
          type: String,
          required: true
        }
      }
    ],


  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Blog model based on the schema
module.exports = mongoose.model("Blog", blogSchema);
