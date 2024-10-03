const UserSignupModel = require("../../Models/UserSignupModel");
const User = require("../../Models/UserProfileModle");
const mongoose = require('mongoose');

const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Check if userId is null or equal to the string "null"
        if (!userId || userId === "null") {
            return res.status(200).json({
                message: "Invalid request, userId is required",
            });
        }

        // Check if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(200).json({
                message: "Invalid userId format",
            });
        }

        const userProfile1 = await UserSignupModel.findOne({ _id: userId });
        const userProfile2 = await User.findOne({ userId: userId });

        if (userProfile1) {
            res.status(200).json({
                message: "Data Fetched",
                userProfile1: userProfile1,
                userProfile2: userProfile2,
            });
        } else {
            res.status(400).json({
                message: "User not found",
                userProfile1: null,
                userProfile2: null,
            });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = { getUserProfile };
