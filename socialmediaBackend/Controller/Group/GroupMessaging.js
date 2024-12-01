const GroupMessageSchema = require('../../Models/GroupMessageSchema');

const GroupMessage = async (req, res) => {
     try {
          
          const data = req.body;

          const newGroupMessage = await GroupMessageSchema.create(data);

          console.log(newGroupMessage)

          if (newGroupMessage) {
               res.status(200).json({
                    success: true,
                    message:'message saved',
               })
          } else {
               res.status(400).json({
                    success: false,
                    message:'Process failed',
               })
          }

     } catch (error) {
          res.status(500).json({
               success: false,
               message:'Server Error',
          })
     }
}

module.exports = {GroupMessage}