const GroupPostLikeModel = require("../../../Models/GroupPostLikeModel");
const GroupPostCommentSchema = require("../../../Models/GroupPostCommentModel");

const GetPostCommentCount = async (req, res) => {
     try {
          const { groupId, postId, userId } = req.body;

          if (!groupId || !postId) {
               return res.status(400).json({
                    success: false,
                    message: "Group ID and Post ID are required.",
               });
          }

          const postLikeData = await GroupPostLikeModel.findOne({ groupId: groupId, groupPostId: postId });
          const postLikeCount = postLikeData ? postLikeData.likedBy.length : 0;
          const isUserLiked = postLikeData?.likedBy?.includes(userId)

          const postCommentCount = await GroupPostCommentSchema.countDocuments({ postId: postId });

          return res.status(200).json({
               success: true,
               likeCount: postLikeCount,
               commentCount: postCommentCount,
               userLiked: isUserLiked,
               message: "Post like and comment counts fetched successfully.",
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
               error: error.message,
          });
     }
};

module.exports = { GetPostCommentCount };
