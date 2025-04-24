const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// Define the schema for the WebsiteComparison model
const websiteComparisonSchema = new mongoose.Schema(
  {
    // Name of the website being reviewed
    websiteName: {
      type: String,
      trim: true,
      required: true,
      max: 100,
    },
    // Website URL (must be unique for easy identification)
    url: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // Overall rating out of 5
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    // Popularity score (could be based on traffic, user votes, etc.)
    popularity: {
      type: Number,
      required: true,
      min: 0,
    },
    // User experience rating (numeric, out of 10)
    userExperience: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    // Detailed review or summary text
    review: {
      type: String,
      trim: true,
    },
    // Array of strings to list key features or comparison points
    features: [
      {
        type: String,
      },
    ],
    // Array of links related to the website (e.g., alternative sources, detailed reviews)
    links: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },

    
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
      },
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the WebsiteComparison model based on the schema
module.exports = mongoose.model("WebsiteComparison", websiteComparisonSchema);
