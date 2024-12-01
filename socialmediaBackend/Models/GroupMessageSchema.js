const mongoose = require('mongoose');

const groupMessage = new mongoose.Schema(
     {
          groupId:{
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Group',
               required: [true, 'Group id is missing'],
          },

          senderId:{
               type: String,
               required: [true, 'Sender id missing'],
          },
          
          message:{
               type: String,
               required: [true, 'Group Message is missing'],
          },
          
     },
     { timestamps: true }
)

module.exports = mongoose.model("groupMessage", groupMessage , "GroupMessageCollection");