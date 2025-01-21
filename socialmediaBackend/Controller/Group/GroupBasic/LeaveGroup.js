const GroupSchema = require('../../../Models/GroupSchema');

const LeaveGroup = async (req, res) => {

     try {
          const { userId, groupId } = req.body;

          const currentGroup = await GroupSchema.findOne({ _id: groupId });

          if (currentGroup) {

               const updatedMember = currentGroup.members.filter((items) => items.toString() !== userId);
               
               const updatedAdmin = currentGroup.groupAdmins.filter((items) => items.toString() !== userId);

               currentGroup.members = updatedMember;
               currentGroup.groupAdmins = updatedAdmin;

               currentGroup.members = updatedMember;
               const update = await currentGroup.save();
               if (update) {
                    return res.status(200).json({
                         success: true,
                         message: "Removed Success",
                    });
               }else{
                    return res.status(400).json({
                         success: false,
                         message: "Removed Failed",
                    });
               }
          } else {
               return res.status(400).json({
                    success: false,
                    message: "Group not found",
               });
          }

     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "Server Error",
               error: error.message,
          });
     }
};

module.exports = { LeaveGroup };
