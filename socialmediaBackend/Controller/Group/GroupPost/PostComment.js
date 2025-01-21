const GroupPostCommentSchema = require('../../../Models/GroupPostCommentModel');

const GroupPostComment = async (req, res) => {
     try {
          const newGroupPostComment = await GroupPostCommentSchema.create(req.body);

          if (newGroupPostComment) {
               return res.status(200).json({
                    success: true,
                    createdCommet: newGroupPostComment._id,
                    message: 'comment created',
               })
          } {
               return res.status(400).json({
                    success: false,
                    message: 'Someting went wrong',
               })
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: 'Server Error',
          })
     }
}

module.exports = { GroupPostComment }