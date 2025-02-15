const Post = require("../../Models/PostModel");

const deletePost = async (req, res) => {
  try {
    const postId = req.body.postId;

    // Find the post by ID and delete it
    const result = await Post.deleteOne({ _id: postId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Post not found',
        deletedCount: result.deletedCount, 
      });
    }

    return res.status(200).json({
      message: 'Post deleted successfully',
      deletedCount: result.deletedCount, 
    });
    
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { deletePost };
