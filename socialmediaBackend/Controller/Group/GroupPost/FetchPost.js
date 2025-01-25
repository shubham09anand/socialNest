const GroupPostSchema = require("../../../Models/GroupPostModel");
const { ObjectId } = require("mongodb");

const fetchGroupPost = async (req, res) => {
     try {
          const { groupId, page } = req.body;

          const limit = 2;

          const skip = (parseInt(page) - 1) * limit;

          if (!groupId) {
               return res.status(400).json({
                    success: false,
                    message: 'Group ID is required',
               });
          }

          const totalPost = await GroupPostSchema.countDocuments({ groupId: groupId });

          const groupPost = await GroupPostSchema.aggregate([
               {
                    $match: {
                         groupId: new ObjectId(groupId),
                    }
               },
               {
                    $lookup: {
                         from: 'UserSignupDataCollection',
                         localField: 'userId',
                         foreignField: '_id',
                         as: 'userDetails',
                    }
               },
               {
                    $project: {
                         '__v': 0,
                         'userDetails.password': 0,
                         'userDetails.createdAt': 0,
                         'userDetails.updatedAt': 0,
                         'userDetails.__v': 0,
                         'userDetails._id': 0,
                    }
               },
               { $skip: skip },
               { $limit: 2 },
          ]);

          if (groupPost.length > 0) {
               return res.status(200).json({
                    success: true,
                    post: groupPost,
                    totalPost: totalPost,
                    message: 'Post Fetched',
               });
          } else {
               return res.status(200).json({
                    success: true,
                    post: [],
                    message: 'No Post Exists',
               });
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: 'Server Error',
          });
     }
};

module.exports = { fetchGroupPost };
