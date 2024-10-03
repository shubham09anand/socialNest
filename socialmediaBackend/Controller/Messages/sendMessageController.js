const Message = require("../../Models/MessageModel")

const sendMessage = async (req, res) => {
  try {
    const userMessage = req.body;
    const newUserMessage = await Message.create(userMessage);

    res.status(200).json({
      message: 'Message Sent Suceesfully',
      userMessage: newUserMessage,
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { sendMessage };