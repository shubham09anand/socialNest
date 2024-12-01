const GroupMessageSchema = require('../../Models/GroupMessageSchema');
const mongoose = require('mongoose');

const FetchGroupMessage = async (req, res) => {
     try {

          const { groupId } = req.body;

          const groupMessage = await GroupMessageSchema.aggregate([
               {
                    $match: {
                         groupId: new mongoose.Types.ObjectId(groupId),
                    },
               },

               {
                    $lookup:
                    {
                         from: "UserSignupDataCollection",
                         let: { senderId: { $toObjectId: '$senderId' } },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ['$_id', '$$senderId'] }
                                   }
                              }
                         ],
                         as: "memberMessgae"
                    }
               },

               {
                    $project: {
                         "memberMessgae.password": 0,
                         "memberMessgae.createdAt": 0,
                         "memberMessgae.updatedAt": 0,
                         "memberMessgae.__v": 0,
                         "__v": 0,
                    }
               }
          ])


          if (groupMessage) {
               res.status(200).json({
                    success: true,
                    data: groupMessage,
                    message: 'message fetched',
               })
          } else {
               res.status(400).json({
                    success: false,
                    message: 'Process failed',
               })
          }

     } catch (error) {
          res.status(500).json({
               success: false,
               message: 'Server Error',
          })
     }
}

module.exports = { FetchGroupMessage }