const groupSchema = require('../../../Models/GroupSchema');

const NotJoinedGroup = async (req, res) => {
     try {

          if (!req.body.userId) {
               return res.status(400).json({
                    success: false,
                    message: "UserId is required"
               });
          }

          const list = await groupSchema.find({ members: { $ne: req.body.userId } });

          return res.status(200).json({
               success: true,
               groupList: list
          });

     } catch (error) {

          return res.status(500).json({
               success: false,
               groupList: [],
               message: "An error occurred while fetching the group list"
          });
     }
}

module.exports = { NotJoinedGroup };
