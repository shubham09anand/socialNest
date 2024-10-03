const mongoose = require("mongoose");

// Define a schema for messages
const messageSchema = new mongoose.Schema(
  {
    // User ID of the sender
    sourceId: {
      type: String,
      required: [true, "Source ID is required"],
    },
    // User ID of the receiver
    reciverId: {
      type: String,
      required: [true, "Target ID is required"],
    },
    // Body of the message
    message: {
      type: String,
      required: [function () { return !this.messagePhoto; }, "Either 'message' or 'message Photo' is required."],
    },
    messagePhoto: [
      {
        type: Object, // Assuming it's a URL or a reference to the post photo
        required: [function () { return !this.message; }, "Either 'message' or 'message Photo' is required."],
      }
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create a Mongoose model for the Message schema
module.exports = mongoose.model("Message", messageSchema , "MessageCollection");
