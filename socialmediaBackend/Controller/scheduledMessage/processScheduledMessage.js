const Message = require("../../Models/MessageModel");
const scheduledMessageSchema = require("../../Models/ScheduledMessage");

const processScheduledMessage = async (_, res) => {
    try {
        const currentDate = new Date();

        const existingScheduledMessages = await scheduledMessageSchema.find();
        let numberOfMessagesCreated = 0;
        let numberOfMessagesDeleted = 0;

        for (const item of existingScheduledMessages) {
            if (item.scheduledDateTime < currentDate) {
                try {
                    const createdMessage = await Message.create({
                        sourceId: item.senderId,
                        reciverId: item.receiverId,
                        message: item.scheduledMessage,
                    });

                    if (createdMessage) {
                        await scheduledMessageSchema.deleteOne({ _id: item._id });
                        numberOfMessagesCreated++;
                        numberOfMessagesDeleted++;
                    }
                } catch (createError) {
                    console.error("Error creating message:", createError);
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error",
                    });
                }
            }
        }

        if (numberOfMessagesCreated > 0) {
            return res.status(200).json({
                success: true,
                numberOfMessagesCreated,
                numberOfMessagesDeleted,
                message: "Messages Updated",
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "No changes",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { processScheduledMessage };
