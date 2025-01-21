const GroupSchema = require('../../../Models/GroupSchema');

const GetgroupInfo = async (req, res) => {

     try {
          const groupData = await GroupSchema.find({ _id: req.body.groupId });

          if (groupData.length === 1) {

               return res.status(200).json({
                    success: true,
                    groupInfo: groupData,
                    message: 'Data Found',
               });

          } else {
               return res.status(400).json({
                    success: false,
                    groupInfo: [],
                    message: 'No group data found',
               });
          }
     } catch (error) {
          console.error(error);
          return res.status(500).json({
               success: false,
               groupInfo: [],
               message: 'Server Error',
          });
     }
};

module.exports = { GetgroupInfo };
