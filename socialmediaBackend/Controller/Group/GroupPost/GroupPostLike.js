const GroupPostLikeModel = require("../../../Models/GroupPostLikeModel");
const { ObjectId } = require("mongodb");

const GroupPostLike = async (req, res) => {
     try {
          const groupId = (req.body.groupId ?? '').trim();
          const groupPostId = (req.body.groupPostId ?? '').trim();
          const userId = (req.body.userId ?? '').trim();

          if (!groupId || !groupPostId || !userId) {
               return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: groupId, groupPostId, or userId',
               });
          }

          const existingLike = await GroupPostLikeModel.findOne({ groupId, groupPostId });

          if (!existingLike) {
               const newPostLike = await GroupPostLikeModel.create({
                    groupId,
                    groupPostId,
                    likedBy: [userId],
               });

               if (newPostLike) {
                    return res.status(200).json({
                         success: true,
                         process: 'create',
                         message: 'Post like created',
                    });
               } else {
                    return res.status(500).json({
                         success: false,
                         totalLike: updatedLike.likedBy.length,
                         message: 'Failed to create like document',
                    });
               }
          } else if (existingLike.likedBy.some((id) => id.equals(userId))) {
               existingLike.likedBy = existingLike.likedBy.filter((id) => !id.equals(userId));

               existingLike.likedCount = Math.max(0, existingLike.likedCount - 1);

               const updatedLike = await existingLike.save();
               if (updatedLike) {
                    return res.status(200).json({
                         success: true,
                         totalLike: updatedLike.likedBy.length,
                         process: 'decrease',
                         message: 'Like removed successfully',
                    });
               } else {
                    return res.status(500).json({
                         success: false,
                         message: 'Failed to update like document',
                    });
               }
          } else {

               existingLike.likedBy.push(userId);
               existingLike.likedCount = existingLike.likedCount + 1;

               const updatedLike = await existingLike.save();
               if (updatedLike) {
                    return res.status(200).json({
                         success: true,
                         totalLike: updatedLike.likedBy.length,
                         process: 'increase',
                         message: 'Post like added',
                    });
               } else {
                    return res.status(500).json({
                         success: false,
                         message: 'Failed to update like document',
                    });
               }
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { GroupPostLike };
