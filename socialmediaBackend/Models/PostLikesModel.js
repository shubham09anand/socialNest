const mongoose = require("mongoose");

// Define a schema for comments
const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: [true, "Post ID is required for comments"],
    },

    likedBy: {
      type: String,
      required: [true, "User ID is required for comments"],
    },

    likedCount: {
      type: Number,
      default: 0,
      required: [false, "Liked by user Id required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema, "PostLikeCollection");
