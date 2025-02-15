const Message = require("../../Models/MessageModel");

const getMessage = async (req, res) => {
     try {
          const { sender_id, reciver_id, page = 1 } = req.body;
          const limit = 5;

          const conversationHistory = await Message.find({
               $or: [
                    { sourceId: sender_id, reciverId: reciver_id },
                    { sourceId: reciver_id, reciverId: sender_id },
               ],
          })
               .sort({ createdAt: -1 })
               .skip((page - 1) * limit)
               .limit(limit);

          const totalMessage = await Message.countDocuments({
               $or: [
                    { sourceId: sender_id, reciverId: reciver_id },
                    { sourceId: reciver_id, reciverId: sender_id },
               ],
          });

          return res.status(200).json({
               message: "Messages fetched successfully",
               conversationHistory: conversationHistory || [],
               totalMessage: totalMessage,
          });
     } catch (error) {
          return res.status(500).json({
               message: "Procedure Failed",
               error: error.message,
          });
     }
};

module.exports = { getMessage };
