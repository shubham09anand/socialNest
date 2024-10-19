const userSignup = require("../../Models/UserSignupModel");

const filterUser = async (req, res) => {
  try {
    const userInput = req.body.userInput;
    console.log(userInput)

    const getSignupData = await userSignup.aggregate([
      {
        $match: {
          userName: {
            $regex: new RegExp(`^@${userInput}`, 'i')
          }
        }
      },
      {
        $lookup: {
          from: 'UserProfileDataCollection',
          let: { searchedPersonId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', '$$searchedPersonId'] }
              }
            },
            {
              $project: {
                "profilePhoto": 1,
              }
            }
          ],
          as: 'searchedPersonProfile'
        }
      }
    ]);

    const filteredData = getSignupData.map(user => {
      if (!user) return null;
      const { __v, password, updatedAt, createdAt, ...rest } = user;
      return rest;
    });

    res.status(200).json({
      message: 'User Data Fetched Successfully',
      filterData: filteredData.filter(Boolean),
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { filterUser };
