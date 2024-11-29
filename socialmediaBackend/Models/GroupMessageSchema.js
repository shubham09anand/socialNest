const mongoose = require('mongoose');

const groupMessage = new mongoose.Schema(
     {
          groupId:{
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Group',
               required: [true, 'Group id is missing'],
          },
          
          groupId:{
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Group',
               required: [true, 'Group Message is missing'],
          },
          
     }
)

module.exports = mongoose.model("groupMessage", groupMessage , "GroupMessageCollection");