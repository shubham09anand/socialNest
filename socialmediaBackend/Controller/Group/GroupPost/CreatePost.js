const GroupPostSchema = require('../../../Models/GroupPostModel');

const CreateGroupPost = async (req, res) => {
     try {
          console.log(req.body.postMessage);
          const newGroupPost = await GroupPostSchema.create(req.body);

          if (newGroupPost) {
               return res.status(200).json({
                    success: true,
                    post: newGroupPost._id,
                    message: 'Post created successfully',
               });
          } else {
               return res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
               });
          }
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: 'Server Error',
          });
     }
};

module.exports = { CreateGroupPost };
