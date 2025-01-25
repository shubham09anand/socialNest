const GroupSchema = require("../../../Models/GroupSchema");
const mongoose = require("mongoose");

const GroupMemberList = async (req, res) => {
     try {
          
          const { groupId } = req.body;

          const groupMembers = await GroupSchema.aggregate([
               {
                    $match: {
                         _id: new mongoose.Types.ObjectId(groupId),
                    },
               },
               {
                    $unwind: {
                         path: "$members",
                         preserveNullAndEmptyArrays: true,
                    },
               },
               {
                    $lookup: {
                         from: "UserSignupDataCollection",
                         localField: "members",
                         foreignField: "_id",
                         as: "memberDetails",
                    },
               },
               {
                    $unwind: {
                         path: "$memberDetails",
                         preserveNullAndEmptyArrays: true,
                    },
               },
               {
                    $lookup: {
                         from: "UserProfileDataCollection",
                         let: { userId: { $toString: "$members" } },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ["$userId", "$$userId"] },
                                   },
                              },
                         ],
                         as: "profileDetails",
                    },
               },
               {
                    $addFields: {
                         "memberDetails.profileDetails": {
                              $arrayElemAt: ["$profileDetails", 0],
                         },
                    },
               },
               {
                    $group: {
                         _id: "$_id",
                         groupName: { $first: "$groupName" },
                         members: { $push: "$memberDetails" },
                    },
               },
               {
                    $project: {
                         "members._id": 1,
                         "members.firstName": 1,
                         "members.lastName": 1,
                         "members.userName": 1,
                         "members.profileDetails.profilePhoto": 1,
                         "members.profileDetails.userId": 1,
                         "members.profileDetails._id": 1,

                    },
               },
          ]);

          if (groupMembers.length > 0) {
               return res.status(200).json({
                    success: true,
                    data: groupMembers[0],
                    message: "Members Fetched Successfully",
               });
          } else {
               return res.status(404).json({
                    success: false,
                    message: "Group or Members Not Found",
               });
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "Server Error",
          });
     }
};

module.exports = { GroupMemberList };