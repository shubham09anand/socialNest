const mongoose = require('mongoose')

const GroupScheduleMessageSchema = new mongoose.Schema(
     {

          groupId: {
               require: [true, 'Group Id required'],
               type: mongoose.Schema.Types.ObjectId,
          },

          groupMessage: {
               require: [true, 'Group Message required'],
               type: String,
          },

          senderId: {
               require: [true, 'sender Id required'],
               type: mongoose.Schema.Types.ObjectId,
          },

          reciverId: {
               require: [true, 'sender Id required'],
               type: mongoose.Schema.Types.ObjectId,
          }
     },

     { timestamps: true }
)

module.exports = mongoose.model("groupScheduleMessageSchema", GroupScheduleMessageSchema, 'GroupScheduleMessCollection')