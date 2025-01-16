const mongoose = require('mongoose');

const GroupPendingMessgaeSchema = new mongoose.Schema(
     {
          groupId: {
               require: [true, 'Id required'],
               type: mongoose.Schema.Types.ObjectId,
          },
          message: {
               require: [true, 'Group Message required'],
               type: String,
          },
          sendingTime: {
               required: [true, "Date and time are required"],
               type: Date,
          },
          senderId: {
               require: [true, 'sender Id required'],
               type: mongoose.Schema.Types.ObjectId,
          },
     },
     {
          timestamps: true
     }
)

module.exports = mongoose.model('groupPendingMessgaeSchema', GroupPendingMessgaeSchema, 'GroupPendingMessgaeCollection')
