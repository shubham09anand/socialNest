const mongoose = require("mongoose");

// Define a schema for posts
const postSchema = new mongoose.Schema(
  {
    // User ID of the corresponding user who created the post
    userId: {
      type: String,
      required: [true, "User ID of the corresponding user who created the Post is required"],
    },
    // Body of the post message
    message: {
      type: String,
      required: [function () { return !this.postPhoto; }, "Either 'message' or 'postPhoto' is required."],
    },
    // Photo of the post
    postPhoto: [
      {
        type: String, // Assuming it's a URL or a reference to the post photo
        required: [function () { return !this.message; }, "Either 'message' or 'postPhoto' is required."],
      }
    ],
    postTags: [
      {
        type: String,
        required: false,
      }
    ]
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create a Mongoose model for the Post schema
module.exports = mongoose.model("Post", postSchema, "PostCollection");
