const GroupMessageSchema = require('../../../Models/GroupMessageSchema');
const mongoose = require('mongoose');

const FetchGroupMessage = async (req, res) => {
     try {
          const page = parseInt(req.body.page) || 0;
          const limit = 4;
          const { groupId } = req.body;

          // Validate groupId
          if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
               return res.status(400).json({
                    success: false,
                    message: 'Invalid or missing groupId',
               });
          }

          // Total messages count
          const totalMessages = await GroupMessageSchema.countDocuments({
               groupId: new mongoose.Types.ObjectId(groupId),
          });

          if (totalMessages === 0) {
               return res.status(200).json({
                    success: true,
                    data: [],
                    totalMessages: 0,
                    message: 'No messages',
               });
          }

          // Adjust skip to ensure non-negative values
          const skip = Math.max(totalMessages - limit * page, 0);

          // Fetch messages with aggregation
          const groupMessage = await GroupMessageSchema.aggregate([
               {
                    $match: {
                         groupId: new mongoose.Types.ObjectId(groupId),
                    },
               },
               {
                    $lookup: {
                         from: 'UserSignupDataCollection',
                         let: { senderId: { $toObjectId: '$senderId' } },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ['$_id', '$$senderId'] },
                                   },
                              },
                         ],
                         as: 'senderMessage',
                    },
               },
               {
                    $project: {
                         'senderMessage.password': 0,
                         'senderMessage.createdAt': 0,
                         'senderMessage.updatedAt': 0,
                         'senderMessage.__v': 0,
                         __v: 0,
                    },
               },
               { $skip: skip },
               { $limit: limit },
          ]);

          if (groupMessage && groupMessage.length > 0) {
               return res.status(200).json({
                    success: true,
                    data: groupMessage,
                    totalMessages,
                    message: 'Messages fetched successfully',
               });
          } else {
               return res.status(200).json({
                    success: true,
                    data: [],
                    totalMessages,
                    message: 'No messages available for the requested page',
               });
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: 'Server Error',
          });
     }
};

module.exports = { FetchGroupMessage };
