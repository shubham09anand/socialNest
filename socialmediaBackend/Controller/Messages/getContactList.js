const UserSignupModel = require("../../Models/UserSignupModel");

const contactList = async (req, res) => {
     try {

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
                    $lookup: {
                         from: 'MessageCollection',
                         let: { userIdObj: { $toString: '$_id' } },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: {
                                             $and: [
                                                  { $eq: ['$reciverId', req.body.userId] },
                                                  { $eq: ['$sourceId', '$$userIdObj'] },
                                                  { $eq: ['$seen', 0] }
                                             ]
                                        }
                                   }
                              }
                         ],
                         as: 'unreadMessages'
                    }
               },
               {
                    $addFields: {
                         unreadCount: { $size: "$unreadMessages" }
                    }
               },
               {
                    $project: {
                         "firstName": 1,
                         "lastName": 1,
                         "userName": 1,
                         "unreadCount": 1
                    }
               }
          ]);

          return res.status(200).json({
               message: "Chat List",
               chatList: getContactList || [],
          });

     } catch (error) {
          return res.status(500).json({
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { contactList };

