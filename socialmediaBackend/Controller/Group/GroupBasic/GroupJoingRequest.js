const GroupJoingSchema = require('../../../Models/GroupJoingSchema');

const GroupJoing = async (req, res) => {

     try {
          const data = req.body;

          const checkExistingReq = await GroupJoingSchema.findOne({ groupId: data.groupId, requesterId: data.requesterId })

          if (!checkExistingReq) {
               const groupRequest = await GroupJoingSchema.create(data)

               if (groupRequest) {
                    return res.status(200).json({
                         message: 'Request Sent',
                         success: true,
                    })
               }
          } else {
               return res.status(200).json({
                    message: 'Request Already Exists',
                    success: false,
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