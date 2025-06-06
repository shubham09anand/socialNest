const GroupPendingMessageSchema = require("../../../Models/GroupPendingMessgae");

const handleGroupPendingScheduleMessage = async (req, res) => {
     try {

          const scheduledMessage = await GroupPendingMessageSchema.create(req.body);

          if (scheduledMessage) {

               return res.status(200).json({
                    success: true,
                    message: "Message Scheduled",
               });
          } else {
               return res.status(400).json({
                    success: false,
                    message: "Process Failed",
               });
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "Server Error",
          });
     }
};

module.exports = { handleGroupPendingScheduleMessage };
