const GroupMessageSchema = require('../../../Models/GroupMessageSchema');

const GroupMessage = async (data) => {
     try {

          if (!data) {
               return ({
                    success: false,
                    message: 'No message recived',
               })
          }

          const newGroupMessage = await GroupMessageSchema.create(data);

          if (newGroupMessage) {
               return ({
                    success: true,
                    message: 'message saved',
                    newGroupMessage: newGroupMessage
               })
          } else {
               return ({
                    success: false,
                    newGroupMessage: [],
                    message: 'Process failed',
               })
          }

     } catch (error) {
          return ({
               success: false,
               message: 'Server Error',
          })
     }
}

module.exports = { GroupMessage }