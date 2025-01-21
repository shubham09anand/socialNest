const GroupPendingMessageSchema = require('../../../Models/GroupPendingMessgae');

const handleGroupPendingMessgaeDelete = async (req, res) => {
     
     const { groupId, messageId } = req.body;

     try {
          const deleteMessage = await GroupPendingMessageSchema.deleteOne({ _id: messageId, groupId: groupId });

          if (deleteMessage.deletedCount === 0) {
               return res.status(404).json({
                    success: false,
                    message: 'Message not found or already deleted.'
               });
          }

          return res.status(200).json({
               success: true,
               message: 'Message successfully deleted.'
          });
     } catch (error) {
          console.error('Error deleting message:', error);
          return res.status(500).json({
               success: false,
               message: 'Server Error'
          });
     }
};

module.exports = { handleGroupPendingMessgaeDelete };