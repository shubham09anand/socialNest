const GroupSchema = require("../../Models/GroupSchema");

const createMessageGroup = async (req, res) => {
     try {
          const gropuData = req.body;

          await GroupSchema.create(gropuData);

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

module.exports = { createMessageGroup };