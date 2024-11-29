const groupMessage = require('../../Models/GroupMessageSchema');

const GroupMessage = async (req, res) => {
     try {
          
          const data = req.body;

          const newGroupMessage = await groupMessage.create(data);

          if (newGroupMessage.acknowledged) {
               res.status(200).json({
                    success: true,
                    message:'message svaed',
               })
          } else {
               
          }

     } catch (error) {
          
     }
}