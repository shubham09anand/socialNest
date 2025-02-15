const PostCommnetModel = require("../../../Models/PostCommnetModel")

const postComment = async (req, res) => {
  try {    
     const postComment = req.body;
    
     const newPostComment = await PostCommnetModel.create(postComment);

     return res.status(200).json({
          message: 'Comment Created Succesfully',
          status: 1,
     });
    
  } catch (error) {
    console.error('Error Creating Comment:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message, 
    });
  }
};

module.exports = {postComment};