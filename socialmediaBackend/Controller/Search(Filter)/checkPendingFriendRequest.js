// this controller is for to check weather the freined requets between loggenin and searched user exists or not

const FriendRequestModle = require("./../../Models/FriendRequestModle");

const getFriendRequestStatus = async (req, res) => {
     try {

          let status = false;

          // console.log("Searched Friend");

          const { person_1, person_2 } = req.body;

          const getStatus = await FriendRequestModle.find({
               $or: [
                    { senderId: person_1, reciverId: person_2 },
                    { senderId: person_2, reciverId: person_1 },
               ]
          });

          if (getStatus.length > 0) {
               status = true;
          }

          return res.status(200).json({
               message: 'User Data Fetched Successfully',
               status: status,
          });
     } catch (error) {
          console.error('Error:', error);
          return res.status(500).json({
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { getFriendRequestStatus };