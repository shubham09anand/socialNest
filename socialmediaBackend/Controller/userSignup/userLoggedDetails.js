const User = require("../../Models/UserProfileModle");

const userLoggedDetails = async (req, res) => {
  try {

    const loggedUserId = req.body.loggedUserId;

    const newUser = await User.aggregate([
      {
        $match: {
          userId: loggedUserId,
        },
      },
      {
        $lookup: {
          from: "UserSignupDataCollection",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toObjectId: "$$userId" }, "$_id"] },
              },
            },
          ],
          as: "details",
        }
      },
      {
        $project: {
          profilePhoto: 1,
          'details.firstName':1,
          'details.lastName':1,
          'details.userName':1
        },
      },
    ]);


    if (!newUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const filterData = {
      profilePhoto: newUser.profilePhoto,
      userName: newUser.firstName,
      lastName: newUser.lastName,
    };

    return res.status(200).json({
      message: 'Photo fetched successfully',
      user: newUser,
    });

  } catch (error) {
    return res.status(200).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { userLoggedDetails };
