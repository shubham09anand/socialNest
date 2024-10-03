const UserSignupModel = require("../../Models/UserSignupModel");

const contactList = async (req, res) => {
     try {
          // console.log("Chat list");
          const getContactList = await UserSignupModel.aggregate([
               {
                    $lookup: {
                         from: 'UserProfileDataCollection',
                         let: { userIdObj: '$_id' },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ['$userId', { $toString: '$$userIdObj' }] }
                                   }
                              }
                         ],
                         as: 'secondPerson'
                    }
               },
               {
                    $project: {
                         "firstName":1,
                         "lastName":1,
                         "userName":1,
                         "secondPerson.profilePhoto": 1,
                    }
               }
          ]);


          res.status(200).json({
               message: "Chat List",
               chatList: getContactList || [],
          });

     } catch (error) {
          console.error('Error:', error);
          res.status(500).json({
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { contactList };
