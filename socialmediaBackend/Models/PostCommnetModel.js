const mongoose = require("mongoose");

// Define a schema for comments
const commentSchema = new mongoose.Schema(
  {
    // Post ID to associate the comment with a specific post
    postId: {
      type: String,
      required: [true, "Post ID is required for comments"],
    },
    // User ID of the corresponding user who created the comment
    commenterId: {
      type: String,
      required: [true, "User ID is required for comments"],
    },
    // Body of the comment
    commentBody: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create a Mongoose model for the Comment schema
module.exports = mongoose.model("Comment", commentSchema , "PostCommentCollection");
