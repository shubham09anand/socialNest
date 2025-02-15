const FriendRequest = require("../../../Models/FriendRequestModle");

const deleteSendedRequest = async (req, res) => {
     try {

          const senderId = req.body.senderId;
          const reciverId = req.body.reciverId;

          const removeRequest = await FriendRequest.findOneAndDelete({ senderId: senderId, reciverId: reciverId });

          if (removeRequest) {
               return res.status(200).json({
                    message: 'Request removed',
                    status: 1,
               });
          } else {
               return res.status(400).json({
                    message: 'Error',
                    status: 0,
               });
          }

     } catch (error) {
          console.error('Error:', error);
          return res.status(500).json({
               message: 'Action Failed',
               error: error.message,
          });
     }
};

module.exports = { deleteSendedRequest };