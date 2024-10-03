const mongoose = require("mongoose");

// Define a schema for friend requests
const friendRequestSchema = new mongoose.Schema(
  {
    // User ID of the person who initiated the friendship (requester)
    senderId: {
      type: String,
      required: [true, "Source ID is required"],
    },
    // User ID of the friend (requestee)
    reciverId: {
      type: String,
      required: [true, "Target ID is required"],
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create a Mongoose model for the FriendRequest schema
module.exports = mongoose.model("friendRequest", friendRequestSchema , "FriendRequestCollection");
