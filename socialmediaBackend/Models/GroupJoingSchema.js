const mongoose = require('mongoose');

const GroupJoingSchema = new mongoose.Schema(
     {
          requesterId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
               required: [true, 'Requester Id is missing']
          },
          groupId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'group',
               required: [true, 'Group Id is missing']
          },
     },
     { timestamps: true }
)

module.exports = mongoose.model("groupJoiningRequest", GroupJoingSchema , "GroupJoiningRequestCollection");