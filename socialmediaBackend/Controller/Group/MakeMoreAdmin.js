const GroupSchema = require('../../Models/GroupSchema');

const MakeMoreAdmin = async (req, res) => {

     try {

          const { groupId, newAdminId } = req.body;

          const currentgroup = await GroupSchema.findOne({ _id: groupId });

          if (currentgroup) {

               if (currentgroup.groupAdmins.indexOf(newAdminId) === -1) {
                    if (currentgroup.members.includes(newAdminId)) {
                         currentgroup.groupAdmins.push(newAdminId);

                         const updatedDoc = currentgroup.save();

                         if (updatedDoc) {
                              res.status(200).json({
                                   success: true,
                                   message: 'admin Added',
                              })
                         } else {
                              res.status(400).json({
                                   success: false,
                                   message: 'Process failed',
                              })
                         }
                    } else {
                         res.status(400).json({
                              success: false,
                              message: 'Person is not member of the group',
                         })
                    }

               } else {
                    res.status(400).json({
                         success: false,
                         message: 'Admin Already Exits',
                    })
               }

          } else {
               res.status(400).json({
                    success: false,
                    message: 'Document no exists with the given Id',
               })
          }

     } catch (error) {
          res.status(500).json({
               success: false,
               message: 'Server Error',
          })
     }

}

module.exports = { MakeMoreAdmin }