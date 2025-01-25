const GroupMessageSchema = require("../../../Models/GroupMessageSchema");

const GroupMessage = async (req, res) => {

     const data = res.body;

     const sendMessage = await GroupMessageSchema.insertOne(data);
     
     if (sendMessage.acknowledge === true) {
          return res.status(200).json({
               message:'message'
          })
     }

}

module.exports = {GroupMessage}