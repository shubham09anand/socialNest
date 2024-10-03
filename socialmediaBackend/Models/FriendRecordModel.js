const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema({
  // User id
  friend_1: {
    type: String,
    required: true,
  },
  // User friend's id
  friend_2: {
    type: String,
    required: true,
  },
}, { timestamps: true });
const Friend = mongoose.model("Friend", friendshipSchema, "FriendRecordCollection");

module.exports = Friend;