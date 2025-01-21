const GroupMessageSchema = require('../../../Models/GroupMessageSchema');

const GroupMessage = async (req, res) => {
     try {
          
          const data = req.body;

          const newGroupMessage = await GroupMessageSchema.create(data);

          if (newGroupMessage) {
               return res.status(200).json({
                    success: true,
                    message:'message saved',
               })
          } else {
               return res.status(400).json({
                    success: false,
                    message:'Process failed',
               })
          }

     } catch (error) {
          return res.status(500).json({
               success: false,
               message:'Server Error',
          })
     }
}

module.exports = {GroupMessage}