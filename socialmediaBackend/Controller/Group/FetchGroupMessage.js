const GroupMessageSchema = require('../../Models/GroupMessageSchema');
const mongoose = require('mongoose');

const FetchGroupMessage = async (req, res) => {
     try {

          const page = parseInt(req.body.page) || 0;
          const limit = 2;

          const { groupId } = req.body;

          const totalMessages = await GroupMessageSchema.countDocuments({
               groupId: new mongoose.Types.ObjectId(groupId),
          });

          const skip = totalMessages - (totalMessages - (limit * page));

          const groupMessage = await GroupMessageSchema.aggregate([
               {
                    $match: {
                         groupId: new mongoose.Types.ObjectId(groupId),
                    },
               },
               {
                    $lookup: {
                         from: "UserSignupDataCollection",
                         let: { senderId: { $toObjectId: '$senderId' } },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ['$_id', '$$senderId'] },
                                   }
                              }
                         ],
                         as: "senderMessage"
                    }
               },
               {
                    $project: {
                         "senderMessage.password": 0,
                         "senderMessage.createdAt": 0,
                         "senderMessage.updatedAt": 0,
                         "senderMessage.__v": 0,
                         "__v": 0,
                    }
               },
               { $skip: skip },
               { $limit: 2 },

          ]);

          if (groupMessage) {
               res.status(200).json({
                    success: true,
                    data: groupMessage,
                    totalMessages: totalMessages,
                    message: 'Messages fetched successfully',
               });
          } else {
               res.status(400).json({
                    success: false,
                    message: 'Failed to fetch messages',
               });
          }

     } catch (error) {
          console.error(error);
          res.status(500).json({
               success: false,
               message: 'Server Error',
          });
     }
};

module.exports = { FetchGroupMessage };