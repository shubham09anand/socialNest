const FriendRequest = require("../../../Models/FriendRequestModle")

const sendedRequest = async (req, res) => {
     try {
          const userId = req.body.userId;

          const FriendRequestList = await FriendRequest.aggregate([
               {
                    $match: {
                         senderId: userId,
                    }
               },
               {
                    $lookup: {
                         from: 'UserSignupDataCollection',
                         let: { reciverObj: { $toObjectId: '$reciverId' } },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ['$_id', '$$reciverObj'] }
                                   }
                              }
                         ],
                         as: 'reciverProfile'
                    }
               },
               {
                    $lookup: {
                         from: 'UserProfileDataCollection',
                         foreignField: "userId",
                         localField: "reciverId",
                         as: 'senderPhoto'
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
                    message: 'No Friend Sent',
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

module.exports = { sendedRequest };