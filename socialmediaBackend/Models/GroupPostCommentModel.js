const mongoose = require('mongoose');

const GrpupPostCommentSchema = new mongoose.Schema(
     {
          postId: {
               require: [true, 'postId id is missing'],
               type: mongoose.Schema.Types.ObjectId,
          },
          commenterId: {
               require: [true, 'commenter id is missing'],
               type: mongoose.Schema.Types.ObjectId,
          },
          comment: {
               require: [true, 'Comment is missing'],
               type: String,
          },
     },
     { timestamps: true }
)

module.exports = mongoose.model('GrpupPostCommentSchema', GrpupPostCommentSchema, 'GroupPostCommentCollection');