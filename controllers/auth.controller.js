// controllers/auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const slugify = require("slugify");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName, username, password, image,role,shortBio,tag,socialMedia,blog,slug } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    

    const newUser = new User({
      email,
      firstName,
      lastName,
      username,
      image,
      password: hashedPassword,
      role,
      shortBio,
      tag,
      socialMedia,
      blog,
      slug: slug?slugify(req.body.slug).toLowerCase():"",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Explicitly include password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      image: user.image,
        isAdmin: user.isAdmin,
        role:user.role
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};



const getSingleUser = async(req,res)=>{
  try {
      const user = await User.findById({_id:req?.params?.id});
   if(!user){
    return res.status(400).json({message:"User not found"})
   }

   res.status(200).json(user)

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error." });
  }
}

const getAllUser = async(req,res)=>{
   try {
        const users = await User.find({});

        if(!users){
          return res.status(400).json({message:"Users Not Found"}) 
        }

        res.status(200).json(users)
   } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error." });
   }
}

const updateStatus = async (req, res) => {
  try {

    let user = await User.findById(req.params.id)
   

    if (!user) return res.status(404).json({ error: "Blog not found" });

    if(user.status ==='Inactive')  {
      user.status ='Active'
    }else{
      user.status ='Inactive'
    }

   const users =  await  user.save()

    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




const getAllAdmin = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ['admin', 'superAdmin', 'seoAdmin'] }
    }).select('+password'); // 👈 Explicitly include password

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No admin users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const {
      email,
      firstName,
      lastName,
      username,
       image,
      role,
      shortBio,
      tag,
      socialMedia,
      slug,
      blog, // This should be a new blog ID or an array of new blog IDs
    } = req.body;

    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (username) user.username = username;
    if (image) user.image = image;
    if (role) user.role = role;
    if (shortBio) user.shortBio = shortBio;
    if (tag) user.tag = tag;
    if (socialMedia) user.socialMedia = socialMedia;
    if(slug) user.slug = slugify(slug).toLowerCase()

    // Append new blog ID(s) instead of replacing
    if (blog) {
      if (Array.isArray(blog)) {
        user.blog.push(...blog); // Add multiple blog IDs
      } else {
        user.blog.push(blog); // Add a single blog ID
      }
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const deleteUserBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { blogsToDelete } = req.body;

    if (!Array.isArray(blogsToDelete) || blogsToDelete.length === 0) {
      return res.status(400).json({ message: "No blogs provided to delete" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out blog IDs to delete
    user.blog = user.blog.filter(
      (blogId) => !blogsToDelete.includes(blogId.toString())
    );

    await user.save();
    res.status(200).json({ message: "Blog(s) deleted from user", blog: user.blog });

  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getUserByslug= async(req,res)=>{
      try {
          
        const user = await User.find({slug:req.params.slug}).populate({
          path: 'blog',
          populate: [
            { path: 'categories', model: 'Category' },
            { path: 'subcategories', model: 'Subcategory' }
          ]
        });
        if(!user){
          res.status(400).json({message:"User not found"})
        }
        res.status(200).json(user)
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
}



const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  // Validate role if it's included in the body
  const validRoles = ['admin', 'superAdmin', 'seoAdmin', 'user'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, // ✅ Use just the ID here
      req.body, // ✅ Update with the whole body
      { new: true, runValidators: true } // also validates schema
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};







module.exports = { registerUser, loginUser,getAllUser,getAllAdmin ,updateUserRole,updateStatus,getSingleUser,updateUser,getUserByslug,deleteUserBlog};
