const GroupPostCommentSchema = require("../../../Models/GroupPostCommentModel");
const { ObjectId } = require("mongodb");

const fetchPostComment = async (req, res) => {
     try {
          const { postId, page } = req.body;

          const limit = 2;

          // Validate postId
          if (!ObjectId.isValid(postId)) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid postId format",
               });
          }

          const countCommnet = await GroupPostCommentSchema.countDocuments({postId});

          const postComment = await GroupPostCommentSchema.aggregate([
               {
                    $match: {
                         postId: new ObjectId(postId), // Use ObjectId to cast groupId
                    }
               },
               {
                    $lookup: {
                         from: 'UserSignupDataCollection',
                         foreignField: '_id',
                         localField: 'commenterId',
                         as: 'userDetails',
                    },
               },
               {
                    $project: {
                         '__v': 0,
                         'userDetails.password': 0,
                         'userDetails.createdAt': 0,
                         'userDetails.updatedAt': 0,
                         'userDetails.__v': 0,
                         'userDetails._id': 0,
                    },
               },
               {
                    $skip: (page - 1) * limit,
               },
               {
                    $limit: limit,
               },
          ]);

          if (postComment.length > 0) {
               res.status(200).json({
                    success: true,
                    comment: postComment,
                    totalComment: countCommnet,
                    message: 'Comment Fetched',
               });
          } else {
               res.status(200).json({
                    success: true,
                    comment: [],
                    message: 'No Comment Exists',
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

module.exports = { fetchPostComment };
