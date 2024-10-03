const UserSignupModel = require("../../Models/UserSignupModel");
const User = require("../../Models/UserProfileModle");

const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId;

    const {
      profilePhoto,
      backGroundPhoto,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      city,
      state,
      country,
      youAre,
      studiedAt,
      description,
    } = req.body;

    // console.log(req.body);

    // Update UserSignupModel
    const updatedProfile1 = await UserSignupModel.findOneAndUpdate(
      { _id: userId },
      { firstName: firstName, lastName: lastName },
      { new: true }
    );

    // Update or create User profile
    let updatedProfile2 = await User.findOneAndUpdate(
      { userId: userId },
      {
        profilePhoto: profilePhoto,
        backGroundPhoto: backGroundPhoto,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        city: city,
        state: state,
        country: country,
        youAre: youAre,
        studiedAt: studiedAt,
        description: description,
      },
      { new: true }
    );

    if (!updatedProfile2) {
      // If user profile doesn't exist, create a new one
      updatedProfile2 = await User.create({
        userId: userId,
        profilePhoto: profilePhoto,
        backGroundPhoto: backGroundPhoto,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        city: city,
        state: state,
        country: country,
        youAre: youAre,
        studiedAt: studiedAt,
        description: description,
      });
    }

    if (updatedProfile1 && updatedProfile2) {
      res.status(200).json({
        message: "Profile Updated",
        status: 1
      });
    } else {
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.error("Update Profile Failed:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { updateProfile };
