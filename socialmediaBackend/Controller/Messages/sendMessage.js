const messageSchema = require("../../Models/MessageModel")

const sendMessage = async (data) => {
     try {
          // Save message to database
          if (data !== null) {
               const saveMessage = await messageSchema.create({ sourceId: data.sourceId, reciverId: data.reciverId, message: data.message , messagePhoto:data.messagePhoto });

               if (saveMessage) {
                    return {
                         success: true,
                         createdMessage:saveMessage,
                         message: "Message Saved",
                    };
               } else {
                    return {
                         success: false,
                         createdMessage:[],
                         message: "Procedure Failed",
                    };
               }
          } else {
               return {
                    success: false,
                    createdMessage:[],
                    message: "No Message Received",
               };
          }
     } catch (error) {
          console.error("Error saving message:", error);
          throw error; // Rethrow the error to be caught by the caller
     }
};

module.exports = { sendMessage };
