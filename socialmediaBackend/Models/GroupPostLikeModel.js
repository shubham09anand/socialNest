const mongoose = require("mongoose");

const GroupPostLikeSchema = new mongoose.Schema(
     {
          groupId: {
               type: mongoose.Schema.Types.ObjectId,
               required: [true, "Group ID is required for like"],
          },
          groupPostId: {
               type: mongoose.Schema.Types.ObjectId,
               required: [true, "Post ID is required for like"],
          },

          likedBy: [{
               type: mongoose.Schema.Types.ObjectId,
               required: [true, "User ID is required for like"],
          }],

          likedCount: {
               type: Number,
               default: 0,
               required: [false, "Liked by user Id required"],
          },
     },
     { timestamps: true }
);

module.exports = mongoose.model("GroupPostLike", GroupPostLikeSchema, "GroupPostLikeCollection");
