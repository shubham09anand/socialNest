const PostCommentSchema = require("../../Models/PostCommnetModel");

const getPostComments = async (req, res) => {
     try {
          const { postId } = req.body;

          if (!postId) {
               return res.status(400).json({
                    message: "Post ID is required"
               });
          }

          const comments = await PostCommentSchema.aggregate([
               {
                    $match: { postId: (postId) },
               },
               {
                    $lookup: {
                         from: "UserSignupDataCollection",
                         let: { commenterId: "$commenterId" },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: ["$_id", { $toObjectId: "$$commenterId" }] },
                                   },
                              },
                              {
                                   $project: { userName: 1, firstName: 1, lastName: 1 },
                              },
                         ],
                         as: "commenterProfile",
                    },
               },
               {
                    $unwind: {
                         path: "$commenterProfile",
                         preserveNullAndEmptyArrays: true,
                    },
               },
               {
                    $project: {
                         _id: 1,
                         postId: 1,
                         commenterId: 1,
                         commentBody: 1,
                         createdAt: 1,
                         "commenterProfile.userName": 1,
                         "commenterProfile.firstName": 1,
                         "commenterProfile.lastName": 1,
                    },
               },
          ]);

          setTimeout(() => {
               return res.status(200).json({
                    message: "Comments fetched successfully",
                    comments: comments,
               });
          }, 500);

     } catch (error) {

          return res.status(500).json({
               message: "Internal Server Error",
               error: error.message
          });
     }
};

module.exports = { getPostComments };
