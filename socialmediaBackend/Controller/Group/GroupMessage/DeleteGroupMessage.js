const GroupMessageSchema = require('../../../Models/GroupMessageSchema');

const DeleteGroupmessage = async (req, res) => {

     try {

          const { messageId } = req.body;

          const deleteMessage = await GroupMessageSchema.findOneAndDelete({ _id: messageId });

          if (deleteMessage) {
               return res.status(200).json({
                    success: true,
                    message: 'Message Deleted Success',
               });
          } else {
               return res.status(400).json({
                    success: false,
                    message: 'No such message exists Process Failed',
               });
          }

     } catch (error) {
          return res.status(500).json({
               success: false,
               message: 'Server Error',
          });
     }

}

module.exports = { DeleteGroupmessage }