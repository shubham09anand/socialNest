const scheduledMessageSchema = require("../../Models/ScheduledMessage");

const scheduledMessageController = async (req, res) => {
    try {

        const scheduledMessageData = req.body;
        const scheduledMessage = await scheduledMessageSchema.create(scheduledMessageData);

        if (scheduledMessage) {
            return res.status(200).json({
                success: true,
                message: "Scheduled Message Set",
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Scheduled Message Procedure Failed",
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
        })
    }
}

module.exports = { scheduledMessageController };