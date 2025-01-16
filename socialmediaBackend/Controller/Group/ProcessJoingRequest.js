const GroupJoingSchema = require("../../Models/GroupJoingSchema");
const GroupSchema = require("../../Models/GroupSchema");

const ProcessJoingRequest = async (req, res) => {
     try {
          const { requestId, requesterId, groupId, action } = req.body;

          if (!requestId || !action) {
               return res.status(400).json({
                    success: false,
                    message: "Missing required fields: requestId or action",
               });
          }

          if (action === 'accept') {

               const group = await GroupSchema.findById(groupId);

               if (!group) {
                    return res.status(404).json({
                         success: false,
                         message: "Group not found",
                    });
               }

               if (!group.members.includes(requesterId)) {
                    group.members.push(requesterId);

                    const updatedGroup = await group.save();

                    if (!updatedGroup) {
                         return res.status(500).json({
                              success: false,
                              message: "Failed to add member to the group",
                         });
                    }

                    const deleteRequest = await GroupJoingSchema.deleteOne({ _id: requestId });

                    if (deleteRequest.deletedCount > 0) {
                         return res.status(200).json({
                              success: true,
                              message: "Person joined the group and request deleted",
                         });
                    } else {
                         return res.status(500).json({
                              success: false,
                              message: "Failed to delete the join request",
                         });
                    }
               }else{
                    return res.status(400).json({
                         success: false,
                         message: "Person is already in group",
                    });
               }


          } else if (action === 'reject') {

               const deleteRequest = await GroupJoingSchema.deleteOne({ _id: requestId });

               if (deleteRequest.deletedCount > 0) {
                    return res.status(200).json({
                         success: true,
                         message: "Join request rejected and deleted",
                    });
               } else {
                    return res.status(404).json({
                         success: false,
                         message: "No such join request found",
                    });
               }
          } else {

               return res.status(400).json({
                    success: false,
                    message: "Invalid action. Allowed actions are 'accept' or 'reject'",
               });
          }
     } catch (error) {
          console.error("Error in ProcessJoingRequest:", error.message);

          res.status(500).json({
               success: false,
               message: "Server Error",
          });
     }
};

module.exports = { ProcessJoingRequest };
