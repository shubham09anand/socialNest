const FriendRecordModel = require("../../../Models/FriendRecordModel");

const friendList = async (req, res) => {
  try {
    const userId = req.body.userId;

    const friendList = await FriendRecordModel.aggregate([
      {
        $match: {
          $or: [
            { friend_1: userId },
            { friend_2: userId }
          ]
        }
      },
      {
        $addFields: {
          selectedFriendId: {
            $cond: {
              if: { $eq: ["$friend_1", userId] },
              then: "$friend_2",
              else: "$friend_1"
            }
          }
        }
      },
      {
        $lookup: {
          from: 'UserProfileDataCollection',
          foreignField: "userId",
          localField: "selectedFriendId",
          as: 'friendPhoto'
        }
      },
      {
        $lookup: {
          from: 'UserSignupDataCollection',
          let: { selectedFriendIdObj: { $toObjectId: '$selectedFriendId' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$selectedFriendIdObj'] }
              }
            }
          ],
          as: 'friendProfile'
        }
      },
      {
        $project: {
          "friendPhoto._id": 0,
          "friendPhoto.dateOfBirth": 0,
          "friendPhoto.phoneNumber": 0,
          "friendPhoto.city": 0,
          "friendPhoto.state": 0,
          "friendPhoto.country": 0,
          "friendPhoto.description": 0,
          "friendPhoto.studiedAt": 0,
          "friendPhoto.youAre": 0,
          "friendPhoto.createdAt": 0,
          "friendPhoto.updatedAt": 0,
          "friendPhoto.__v": 0,
          "friendProfile.password": 0,
          "friendProfile.createdAt": 0,
          "friendProfile.updatedAt": 0,
          "friendProfile.__v": 0,
          "createdAt":0,
          "updatedAt":0,
          "__v":0,
        }
      }
    ]);

    if (friendList) {
      res.status(200).json({
        message: 'Success',
        friendList: friendList,
      });
    } else {
      res.status(400).json({
        message: 'Error',
        friendList: friendList,
      });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Network Error',
      error: error.message,
    });
  }
};

module.exports = { friendList };