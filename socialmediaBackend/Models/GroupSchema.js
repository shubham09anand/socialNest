const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
     {
          groupName: {
               type: String,
               required: [true, 'Group name required']
          },
          groupDesc: {
               type: String,
               required: [true, 'Group Desc required']
          },
          groupIcon: {
               type: String,
          },
          members: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
               },
          ],
          ownerID: {
               type: mongoose.Schema.Types.ObjectId,
               required: [true, 'owner id is missing'],
               ref: 'User',
          },
          groupAdmins: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
               }
          ]
     },
     { timestamps: true }
)

module.exports = mongoose.model("groupSchema", GroupSchema, "GroupSchemaCollection");
