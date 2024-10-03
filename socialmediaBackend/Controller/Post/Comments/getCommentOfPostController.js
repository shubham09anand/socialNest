const PostComment = require("../../../Models/PostCommnetModel")

const getPostComment = async (req, res) => {
     try {       
        const getPostComment = await PostComment.find({postId:req.body.postId});

        if ( getPostComment.length === 0) {
          res.status(400).json({
               message: 'No Commnet On This Post',
               id:req.body,
          });
        }
       else{
          res.status(200).json({
               message: 'Comment Fetched Sucessfully',
               getPostComment: getPostComment,
          });
       }
       
     } catch (error) {
       console.error('Procedure failed:', error);
       res.status(500).json({
         message: 'Internal Server Error',
         error: error.message, 
       });
     }
   };
   
   module.exports = {getPostComment};