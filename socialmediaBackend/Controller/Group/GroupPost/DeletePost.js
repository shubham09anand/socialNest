const GroupPostSchema = require("../../../Models/GroupPostModel");

const DeletePost = async (req, res) => {
     try {
          const { groupId, postId } = req.body;

          const groupPost = await GroupPostSchema.deleteOne({_id:postId, groupId:groupId});

          if (groupPost.deletedCount === 1 ) {
               return res.status(200).json({
                    success: true,
                    message: 'Group Post Deleted',
               });
          } else {
               return res.status(400).json({
                    success: false,
                    message: 'Someting went wrong',
               });
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: 'Server Error',
          });
     }
};

module.exports = { DeletePost };
