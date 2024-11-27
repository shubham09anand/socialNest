const mongoose = require("mongoose");
const Message = require("../../Models/MessageModel");

const deleteMessage = async (req, res) => {
     try {
          const { messageID } = req.body;

          if (!messageID || !mongoose.Types.ObjectId.isValid(messageID)) {
               return res.status(400).json({
                    message: 'Invalid or missing messageID',
                    status: 400,
               });
          }

          const conversationHistory = await Message.deleteOne({ _id: messageID });

          if (conversationHistory.deletedCount === 0) {
               return res.status(404).json({
                    message: 'No message found with the given ID',
                    status: 404,
               });
          }

          res.status(200).json({
               message: 'Message deleted successfully',
               deleteCount: conversationHistory.deletedCount,
               status: 200,
          });
     } catch (error) {
          console.error('Error:', error);
          res.status(500).json({
               message: 'Procedure Failed',
               status: 500,
               error: error.message,
          });
     }
};

module.exports = { deleteMessage };
