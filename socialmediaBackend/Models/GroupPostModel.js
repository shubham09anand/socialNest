const mongoose = require('mongoose');

const GrpupPostSchema = new mongoose.Schema(
     {
          groupId: {
               require: [true, 'group id is missing'],
               type: mongoose.Schema.Types.ObjectId,
          },
          userId: {
               require: [true, 'user id is missing'],
               type: mongoose.Schema.Types.ObjectId,
          },
          type: {
               require: [true, 'type is missing'],
               type: String,
          },
          postPhoto: [{
               require: [true, 'postPhoto is missing'],
               type: String,
          }],
          postMessage: {
               require: [true, 'postMessage is missing'],
               type: String,
          },
     },
     { timestamps: true }
)

module.exports = mongoose.model('GrpupPostSchema', GrpupPostSchema, 'GroupPostCollection');