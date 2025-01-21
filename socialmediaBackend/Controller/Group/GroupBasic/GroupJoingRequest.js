const GroupJoingSchema = require('../../../Models/GroupJoingSchema');

const GroupJoing = async (req, res) => {

     try {
          const data = req.body;

          const groupRequest = await GroupJoingSchema.create(data)

          if (groupRequest) {
               return res.status(200).json({
                    message: 'Request Sent',
                    success: true,
                    error: null,
               })
          }

     } catch (error) {
          return res.status(500).json({
               message: 'Server Error',
               success: false,
               error: error.message,
          })
     }
}

module.exports = { GroupJoing };