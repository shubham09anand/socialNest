const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Custom ID is required"],
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is not required"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: false,
    },
    city: {
      type: String,
      trim: true,
      required: false,
    },
    state: {
      type: String,
      trim: true,
      required: false,
    },
    country: {
      type: String,
      trim: true,
      required: false,
    },
    description: {
      type: String,
      maxlength: 500,
      required: true,
      trim: true,
    },
    profilePhoto: {
      type: String,
    },
    backGroundPhoto: {
      type: String,
    },
    studiedAt: {
      type: String,
      trim: true,
      required: false,
    },
    youAre: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userProfileData", registerSchema, "UserProfileDataCollection");
