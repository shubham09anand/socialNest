const scheduledMessageSchema = require("../../Models/ScheduledMessage");

const getScheduledMessage = async (req, res) => {
  try {

    const userId = req.body.userId;
    const receiver_id = req.body.receiver_id;

    const scheduledMessages = await scheduledMessageSchema.aggregate([
      {
        $match: {
          senderId: userId,
          receiverId: receiver_id,
        }
      },
      {
        $project: {
          senderId: 0,
          reciverId: 0,
          updated_at: 0,
          __v: 0
        }
      }
    ]);

    res.status(200).json({
      success: scheduledMessages.length > 0,
      messages: scheduledMessages || [],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = { getScheduledMessage };
