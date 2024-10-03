const FriendRecordModel = require("./../../Models/FriendRecordModel");

const getFriendShipStatus = async (req, res) => {
     try {

          let status = false;

          // console.log("Searched Friend");

          const { person_1, person_2 } = req.body;

          const getStatus = await FriendRecordModel.find({
               $or: [
                    { friend_1: person_1, friend_2: person_2 },
                    { friend_1: person_2, friend_2: person_1 },
               ]
          });

          if (getStatus.length > 0) {
               status = true;
          }

          res.status(200).json({
               message: 'User Data Fetched Successfully',
               status: status,
          });
     } catch (error) {
          console.error('Error:', error);
          res.status(500).json({
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { getFriendShipStatus };