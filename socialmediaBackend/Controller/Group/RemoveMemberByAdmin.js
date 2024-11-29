const GroupSchema = require('../../Models/GroupSchema');

const RemoveMemberByAdmin = async (req, res) => {

     try {
          const { groupId, userId } = req.body;

          const currentGroup = await GroupSchema.findOne({ _id: groupId, members: { $in: [userId] } });

          if (currentGroup) {

               const updatedMember = currentGroup.members.filter((items) => items.toString() !== userId);
               const updatedAdmin = currentGroup.groupAdmins.filter((items) => items.toString() !== userId);

               currentGroup.members = updatedMember;
               currentGroup.groupAdmins = updatedAdmin;

               const update = await currentGroup.save();

               if (update) {
                    res.status(200).json({
                         success: true,
                         message: 'Member Removed Success'
                    })
               } else {
                    res.status(400).json({
                         success: false,
                         message: 'Member Removed Failed'
                    })
               }

          } else {
               res.status(404).json({
                    success: false,
                    message: 'Group not found or user is not a member'
               })
          }
     } catch (error) {
          res.status(500).json({
               success: false,
               message: 'Server Error'
          })
     }
}

module.exports = { RemoveMemberByAdmin }