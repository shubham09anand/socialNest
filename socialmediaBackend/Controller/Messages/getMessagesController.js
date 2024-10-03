const Message = require("../../Models/MessageModel");

const getMessage = async (req, res) => {
  try {
    const { sender_id, reciver_id } = req.body;
    // console.log(req.body)
    const conversationHistory = await Message.find({
      $or: [
        { sourceId: sender_id, reciverId: reciver_id },
        { sourceId: reciver_id, reciverId: sender_id },
      ],
    });

    res.status(200).json({
      message: 'Messages fetched successfully',
      conversationHistory: conversationHistory || [],
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Procedure Failed',
      error: error.message,
    });
  }
};

module.exports = { getMessage };
