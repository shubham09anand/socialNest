const mongoose = require("mongoose");

// Define a schema for messages
const scheduledMessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: [true, "Source ID is required"],
    },
    receiverId: {
      type: String,
      required: [true, "Target ID is required"],
    },
    scheduledMessage: {
      type: String,
      required: [true, "Message is required"],
    },
    scheduledDateTime: {
      type: Date,
      required: [true, "Date and time are required"],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } } // Specify custom field names for timestamps
);

module.exports = mongoose.model("ScheduledMessage", scheduledMessageSchema, "ScheduledMessageCollection");