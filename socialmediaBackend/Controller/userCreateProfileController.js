const User = require("../Models/UserProfileModle");

const createuserProfile = async (req, res) => {
  try {

    const userData = req.body;
    const newUser = await User.create(userData);

    return res.status(200).json({
      message: 'User registered successfully',
      user: newUser,
    });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { createuserProfile };