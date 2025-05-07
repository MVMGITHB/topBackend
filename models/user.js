const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },


    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin', 'seoAdmin'],
      default: 'user',
    },
    
    password: {
      type: String,
      required: true,
      select: false, // hides it from queries unless explicitly selected
    },

    shortBio:{
       type:String,
    },

    tag:{
      type:String,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    socialMedia: {
      facebook: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      profile: { type: String }
  },

   blog: [{ type: ObjectId, ref: "Blog", required: true }],

    status:{
      type:String,
      default:"Inactive"
    }
  },
  { timestamps: true }
);

// Use existing model if it exists (avoids OverwriteModelError during dev)
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
