const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    userName: {
      type: String,
      required:true,
    },
    password: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userSignupData", signupSchema , "UserSignupDataCollection");
