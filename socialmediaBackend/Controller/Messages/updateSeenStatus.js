const messageSchema = require("../../Models/MessageModel");

const updateSeenStatus = async (data) => {
     try {
          
          if (!data?.messageId) {
               return {
                    success: false,
                    message: "Invalid Message ID Provided",
               };
          }

          const result = await messageSchema.updateOne(
               { _id: data?.messageId, seen: 0 }, // Find by ObjectId and ensure it's unseen
               { $set: { seen: 1 } }
          );

          if (result.modifiedCount === 0) {
               return {
                    success: false,
                    message: "Message Not Found or Already Seen",
               };
          }

          return {
               success: true,
               message: "Message Seen Status Updated",
               updatedMessageId: data?.messageId
          };

     } catch (error) {
          console.error("Error updating seen status:", error);
          return {
               success: false,
               message: "Internal Server Error",
          };
     }
};

module.exports = { updateSeenStatus };
