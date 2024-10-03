const User = require("../../Models/UserProfileModle");

const userLoggedDetails = async (req, res) => {
  try {
    const loggedUserId = req.body.loggedUserId;

    const newUser = await User.findOne({ userId: loggedUserId });

    if (!newUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const filterData = {
      profilePhoto: newUser.profilePhoto
    };

    res.status(200).json({
      message: 'Photo fetched successfully',
      user: newUser ? filterData : " ",
    });

  } catch (error) {
    res.status(200).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { userLoggedDetails };
