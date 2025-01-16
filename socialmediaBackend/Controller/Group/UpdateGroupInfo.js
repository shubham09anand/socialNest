const GroupSchema = require("../../Models/GroupSchema");

const UpdateGroupInfo = async (req, res) => {

     try {
          const currGroup = await GroupSchema.updateOne(
               { _id: req.body.groupId },
               {
                    $set: { groupName: req.body.groupName, groupDesc: req.body.groupDesc }
               });

          if (currGroup) {
               setTimeout(() => {
                    res.status(200).json({
                         success: true,
                         updateCount: currGroup.updateCount,
                    })
               }, 5000);
          } else {
               res.status(400).json({
                    success: false,
                    updateCount: 0,
               })
          }
     } catch (error) {
          res.status(500).json({
               success: false,
               updateCount: 0,
          })
     }

}

module.exports = { UpdateGroupInfo }