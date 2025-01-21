const GroupJoingSchema = require("../../../Models/GroupJoingSchema");
const mongoose = require('mongoose');

const FetchAllPendingRequest = async (req, res) => {
     try {

          const { groupId } = req.body;

          const fetchRequest = await GroupJoingSchema.aggregate([
               {
                    $match: {
                         groupId: new mongoose.Types.ObjectId(groupId),
                    },
               },
               {
                    $lookup: {
                         from: "UserSignupDataCollection",
                         localField: "requesterId",
                         foreignField: "_id",
                         as: "requestedUserSignup",
                    }
               },
               {
                    $lookup: {
                         from: "UserProfileDataCollection",
                         // the let will accept only that varibale which is type part of the localCollection 
                         let: { requesterId: { $toString: '$requesterId' } },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ['$userId', '$$requesterId'] }
                                   }
                              }
                         ],
                         as: "requestedUserProfile",
                    }
               },
               {
                    $addFields: {
                         userRequesterData: {
                              $concatArrays: ["$requestedUserSignup", "$requestedUserProfile"],
                         },
                    },
               },
               {
                    $project: {
                         requestedUserSignup: 0,
                         requestedUserProfile: 0,
                         "userRequesterData.password": 0,
                         "userRequesterData.createdAt": 0,
                         "userRequesterData.updatedAt": 0,
                         "userRequesterData.__v": 0,
                         "userRequesterData._id": 0,
                         "userRequesterData.userId": 0,
                         "userRequesterData.dateOfBirth": 0,
                         "userRequesterData.phoneNumber": 0,
                         "userRequesterData.city": 0,
                         "userRequesterData.state": 0,
                         "userRequesterData.country": 0,
                         "userRequesterData.description": 0,
                         "userRequesterData.studiedAt": 0,
                         "userRequesterData.youAre": 0,
                         "userRequesterData.createdAt": 0,
                         "userRequesterData.updatedAt": 0,
                         "userRequesterData.__v": 0,
                         "__v": 0,
                    },
               },
          ]);

          if (fetchRequest) {
               return res.status(200).json({
                    success: true,
                    data: fetchRequest,
                    message: 'Request Fetched',
               });
          } else {
               return res.status(400).json({
                    success: false,
                    message: 'Process Failed',
               });
          }

     } catch (error) {
          res.status(500).json({
               success: false,
               message: "Server Error",
          });
     }
};

module.exports = { FetchAllPendingRequest };
