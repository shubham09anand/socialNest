const FriendRequest = require("../../../Models/FriendRequestModle")

const recivedFriendRequest = async (req, res) => {
     try {
          // console.log("Friend Reuqest recived")
          const userId = req.body.userId;
          // console.log(userId)
          
          const FriendRequestList = await FriendRequest.aggregate([
               {
                    $match: {
                         reciverId: userId,
                    }
               },
               {
                    $lookup: {
                         from: 'UserSignupDataCollection',
                         let: { senderIdObj: { $toObjectId: '$senderId' } },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ['$_id', '$$senderIdObj'] }
                                   }
                              }
                         ],
                         as: 'senderProfile'
                    }
               },
               {
                    $lookup: {
                         from: 'UserProfileDataCollection',
                         foreignField: "userId",
                         localField: "senderId",
                         as: 'senderPhoto'
                    }
               },
               {
                    $project: {
                         "senderPhoto.profilePhoto":1,
                         "senderProfile":1
                    }
               },

          ]);

          if (FriendRequestList) {
               res.status(200).json({
                    message: 'List of Recived Friedn Request',
                    FriendRequestList: FriendRequestList,
               });
          }
          else {
               res.status(400).json({
                    message: 'No Friend Request',
                    FriendRequestList: FriendRequestList,
               });
          }

     } catch (error) {
          console.error('Error:', error);
          res.status(500).json({
               message: 'Retrevation Failed',
               error: error.message,
          });
     }
};

module.exports = { recivedFriendRequest };