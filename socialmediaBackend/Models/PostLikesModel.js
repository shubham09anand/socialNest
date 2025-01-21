const mongoose = require("mongoose");

// Define a schema for comments
const LikeSchema = new mongoose.Schema(
  {
    // Post ID to associate the comment with a specific post
    postId: {
      type: String,
      required: [true, "Post ID is required for comments"],
    },

    // User ID of the corresponding user who created the comment
    likedBy: {
      type: String,
      required: [true, "User ID is required for comments"],
    },

    // Number of likes on the post
    likedCount: {
      type: Number,
      default: 0,
      required: [false, "Liked by user Id required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema, "PostLikeCollection");
