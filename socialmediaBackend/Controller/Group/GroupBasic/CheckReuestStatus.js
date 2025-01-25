const groupJoingSchema = require('../../../Models/GroupJoingSchema');

const CheckReuestStatus = async (req, res) => {
     try {

          if (!req.body.userId || !req.body.groupId) {
               return res.status(400).json({
                    success: false,
                    message: "UserId and GroupId are required"
               });
          }

          const isRequested = await groupJoingSchema.findOne({
               requesterId: req.body.userId,
               groupId: req.body.groupId
          });

          if (isRequested) {
               return res.status(200).json({
                    success: true,
                    requested: true,
                    message: "You have already requested to join this group."
               });
          }

          return res.status(200).json({
               success: true,
               requested: false,
               message: "No join request found for this group."
          });

     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "An error occurred while checking the join request status."
          });
     }
};

module.exports = { CheckReuestStatus };
