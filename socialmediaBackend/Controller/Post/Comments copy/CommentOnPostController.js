const PostCommnetModel = require("../../../Models/PostCommnetModel")

const postComment = async (req, res) => {
  try {    
     const postComment = req.body;
    
     const newPostComment = await PostCommnetModel.create(postComment);

     res.status(200).json({
          message: 'Comment Created Succesfully',
          comment: newPostComment,
     });
    
  } catch (error) {
    console.error('Error Creating Comment:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message, 
    });
  }
};

module.exports = {postComment};