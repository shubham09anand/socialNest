const FriendRequestModle = require("../../../Models/FriendRequestModle");
const FriendRecordModel = require("../../../Models/FriendRecordModel");

const processFriendRequest = async (req, res) => {
     try {
          const { reciverId, senderId, action } = req.body;
          
          // Find the existing friend request between the sender and receiver
          const receivedFriendRequest = await FriendRequestModle.findOne({
               reciverId: reciverId,
               senderId: senderId,
          });

          if (receivedFriendRequest) {
               if (action === "Accepted") {
                    const newFriend = await FriendRecordModel.create({
                         friend_1: reciverId,
                         friend_2: senderId,
                    });

                    if (newFriend) {
                         const friendRequestIdToDelete = receivedFriendRequest._id;
                         const deletedFriendRequest = await FriendRequestModle.deleteOne({ _id: friendRequestIdToDelete });

                         return res.status(200).json({
                              message: "Friend request accepted",
                              status: 1, // Return 1 for accepted status
                              deletedFriendRequest: deletedFriendRequest,
                         });
                    } else {
                         return res.status(500).json({
                              message: "Error creating friend record",
                              status: 0,
                         });
                    }
               } else if (action === "Rejected") {
                    const friendRequestIdToDelete = receivedFriendRequest._id;
                    const deletedFriendRequest = await FriendRequestModle.deleteOne({ _id: friendRequestIdToDelete });

                    return res.status(200).json({
                         message: "Friend request rejected",
                         status: 0, // Return 0 for rejected status
                         deletedFriendRequest: deletedFriendRequest,
                    });
               } else {
                    return res.status(400).json({
                         message: "Invalid action",
                         status: 0,
                    });
               }
          } else {
               return res.status(404).json({
                    message: "Friend request not found",
                    status: 0,
               });
          }
     } catch (error) {
          console.error("Error processing friend request:", error);
          return res.status(500).json({
               message: "Server error",
               error: error.message,
               status: 0,
          });
     }
};

module.exports = { processFriendRequest };
