const Post = require("../../Models/PostModel")
const createuserPost = async (req, res) => {
  try {
    const userPost = req.body;
    
     await Post.create(userPost);

     res.status(200).json({
          message: 'Post Created Succesfully',
          status: 1,
     });
    
  } catch (error) {
    console.error('Error Creating Post:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message, 
    });
  }
};

module.exports = {createuserPost};