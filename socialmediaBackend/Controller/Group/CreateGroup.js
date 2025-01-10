const GroupSchema = require("../../Models/GroupSchema");

const CreateGroup = async (req, res) => {
     try {
          const gropuData = req.body;

          const newGroup = await GroupSchema.create(gropuData);

          if (newGroup) {
               newGroup.members.push(req.body.ownerID);
               await newGroup.save(); 
          }

          res.status(200).json({
               message: 'Group Created Succesfully',
               status: 1,
          });

     } catch (error) {
          console.error('Error Creating Gropu:', error);
          res.status(500).json({
               message: 'Internal Server Error',
               error: error.message,
          });
     }
};

module.exports = { CreateGroup };