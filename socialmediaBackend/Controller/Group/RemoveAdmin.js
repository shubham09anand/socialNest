const groupSchema = require("../../Models/GroupSchema");

const RemoveAdmin = async (req, res) => {

     try {
          const { groupId, userId } = req.body;
          
          const currentGroup = await groupSchema.findOne({ _id: groupId });

          if (currentGroup) {

               const updatedAdmin = currentGroup.groupAdmins.filter((items) => items.toString() !== userId);

               currentGroup.groupAdmins = updatedAdmin;

               const update = await currentGroup.save();

               if (update) {
                    res.status(200).json({
                         success: true,
                         message: 'Admin Removed'
                    })
               } else {
                    res.status(400).json({
                         success: false,
                         message: 'Process Failed'
                    })
               }

          } else {
               res.status(400).json({
                    success: false,
                    message: 'No Group Found'
               })
          }

     } catch (error) {
          res.status(500).json({
               success: false,
               message: 'Server Error'
          })
     }

}

module.exports = { RemoveAdmin }