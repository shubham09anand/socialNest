const scheduledMessageSchema = require("../../Models/ScheduledMessage");

const deleteScheduledMessageController = async (req, res) => {
    try {
        const messageId = req.body.messageId;
        console.log("Message ID received:", messageId);

        if (!messageId) {
            console.log("No Message ID provided");
            return res.status(400).json({
                success: false,
                message: "Message ID is required",
                status: 0,
            });
        }

        const result = await scheduledMessageSchema.deleteOne({ _id: messageId });

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "Scheduled Message Deleted Successfully",
                status: 1,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Scheduled Message Not Found or already deleted",
                status: 0,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
            status: 0,
        });
    }
};

module.exports = { deleteScheduledMessageController };
