const GroupPendingMessage = require('../../../Models/GroupPendingMessgae');
const GroupMessage = require('../../../Models/GroupMessageSchema');

const ProcessSchedulingMessage = async (_, res) => {
     try {
          const currentDate = new Date();
          let newMessageCount = 0;
          let errorCount = 0;

          const getAllGroupMessage = await GroupPendingMessage.find();

          if (getAllGroupMessage.length > 0) {
               for (const item of getAllGroupMessage) {
                    if (new Date(item.sendingTime) < currentDate) {

                         const { _id, sendingTime, ...messageData } = item.toObject();

                         const newMessage = await GroupMessage.create(messageData);

                         if (newMessage) {
                              newMessageCount += 1;
                              await GroupPendingMessage.deleteOne({ _id });
                         }
                    } else {
                         errorCount += 1;
                    }
               }

               return res.status(200).json({
                    success: true,
                    newMessageCount,
                    errorCount,
                    message: `${newMessageCount} new message(s) created and ${errorCount} message(s) still pending.`,
               });
          } else {
               return res.status(200).json({
                    success: true,
                    newMessageCount: 0,
                    errorCount: 0,
                    message: 'No pending messages found.',
               });
          }
     } catch (error) {
          console.error(error);
          return res.status(500).json({
               success: false,
               message: 'Server error occurred.',
          });
     }
};

module.exports = { ProcessSchedulingMessage };
