const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// Define the schema for the WebsiteComparison model
const CompanySchema = new mongoose.Schema(
  {
    // Name of the website being reviewed
    websiteName: {
      type: String,
      trim: true,
      required: true,
      max: 100,
    },
    // Website URL (must be unique for easy identification)
    visitSiteUrl: {
      type: String,
      required: true,
     
    },
    // Overall rating out of 5
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    
    // Detailed review or summary text
    review: {
      type: String,
      trim: true,
    },
    // Array of strings to list key features or comparison points
    features: {
        type:[String],
    },

   logo:{
    type:String,
   },

   mainHeading: {
    type:String,
  },

  benifits:{
    type:[String],
  },
  
  Description:{
    type:String,
  },

  pros:{
    type:[String],
  },
  cons:{
    type:[String],
  },

  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },

  status:{
    type:String,
    default:"Inactive"
  },

  slug: {
    type: String,
    unique: true,
    index: true,
  },

  subcategories: { type: ObjectId, ref: "Subcategory", },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the WebsiteComparison model based on the schema
module.exports = mongoose.model("Company", CompanySchema);
