const mongoose = require('mongoose');

const groupMessage = new mongoose.Schema(
     {
          groupId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Group',
               required: [true, 'Group id is missing'],
          },

          senderId: {
               type: String,
               required: [true, 'Sender id missing'],
          },

          message: {
               type: String,
               required: [function () { return !this.messagePhoto; }, "Either 'message' or 'message Photo' is required."],
          },
          messagePhoto: [
               {
                    type: Object, // Assuming it's a URL or a reference to the post photo
                    required: [function () { return !this.message; }, "Either 'message' or 'message Photo' is required."],
               }
          ],

     },
     { timestamps: true }
)

module.exports = mongoose.model("groupMessage", groupMessage, "GroupMessageCollection");