const GroupPendingMessageSchema = require("../../../Models/GroupPendingMessgae");

const getPendingMessage = async (req, res) => {

     try {
          const getPendingMessage = await GroupPendingMessageSchema.find({ groupId: req.body.groupId, senderId:req.body.senderId });

          if (getPendingMessage) {
               return res.status(200).json({
                    success: true,
                    pendingMessage: getPendingMessage.length > 0 ? getPendingMessage : [],
                    message: getPendingMessage.length > 0 ? 'Message Fetched' : 'No Message Found',
               })
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: 'Server Error',
          })
     }

}

module.exports = { getPendingMessage }