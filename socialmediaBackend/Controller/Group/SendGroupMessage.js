const GroupMessageSchema = require("../../Models/GroupMessageSchema");

const GroupMessage = async (req, res) => {

     const data = res.body;

     const sendMessage = await GroupMessageSchema.insertOne(data);
     
     if (sendMessage.acknowledge === true) {
          res.status(200).json({
               message:'MEssa'
          })
     }

}

module.exports = {GroupMessage}