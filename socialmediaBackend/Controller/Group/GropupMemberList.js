const GroupSchema = require("../../Models/GroupSchema");
const mongoose = require("mongoose");

const GroupMemberList = async (req, res) => {
     try {
          const { groupId } = req.body;

          const groupMembers = await GroupSchema.aggregate([
               // Match the specific group by ID
               {
                    $match: {
                         _id: new mongoose.Types.ObjectId(groupId),
                    },
               },
               // Unwind the members array
               {
                    $unwind: {
                         path: "$members",
                         preserveNullAndEmptyArrays: true,
                    },
               },
               // Lookup user details from UserSignupDataCollection
               {
                    $lookup: {
                         from: "UserSignupDataCollection",
                         localField: "members",
                         foreignField: "_id",
                         as: "memberDetails",
                    },
               },
               // Unwind the member details to make it accessible
               {
                    $unwind: {
                         path: "$memberDetails",
                         preserveNullAndEmptyArrays: true,
                    },
               },
               // Lookup profile image from UserProfileDataCollection
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
               // Add profileDetails into the member object
               {
                    $addFields: {
                         "memberDetails.profileDetails": {
                              $arrayElemAt: ["$profileDetails", 0],
                         },
                    },
               },
               // Regroup all members back into the group
               {
                    $group: {
                         _id: "$_id",
                         groupName: { $first: "$groupName" },
                         members: { $push: "$memberDetails" },
                    },
               },
               // Remove sensitive or unnecessary fields
               {
                    $project: {
                         "members.password": 0,
                         "members.createdAt": 0,
                         "members.updatedAt": 0,
                         "members.__v": 0,
                         "members.profileDetails.dateOfBirth": 0,
                         "members.profileDetails.phoneNumber": 0,
                         "members.profileDetails.city": 0,
                         "members.profileDetails.state": 0,
                         "members.profileDetails.country": 0,
                         "members.profileDetails.description": 0,
                         "members.profileDetails.studiedAt": 0,
                         "members.profileDetails.youAre": 0,
                         "members.profileDetails.createdAt": 0,
                         "members.profileDetails.updatedAt": 0,
                         "members.profileDetails.__v": 0,
                         "__v": 0,
                    },
               },
          ]);

          if (groupMembers.length > 0) {
               return res.status(200).json({
                    success: true,
                    data: groupMembers[0], // Return the first (and only) matched group with populated members
                    message: "Members Fetched Successfully",
               });
          } else {
               return res.status(404).json({
                    success: false,
                    message: "Group or Members Not Found",
               });
          }
     } catch (error) {
          console.error(error);
          res.status(500).json({
               success: false,
               message: "Server Error",
          });
     }
};

module.exports = { GroupMemberList };