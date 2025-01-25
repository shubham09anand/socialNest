const PostLikesModel = require("../../../Models/PostLikesModel");

const postLike = async (req, res) => {
  try {
    const postLikeData = req.body;

    const postId = (req.body.postId ?? '').trim();
    const likedBy = (req.body.likedBy ?? '').trim();

    const existingLike = await PostLikesModel.findOne({ postId, likedBy });

    if (!existingLike) {
      const newPostLike = await PostLikesModel.create(postLikeData);

      return res.status(200).json({
        message: 'Post liked successfully',
        like: newPostLike,
      });
    } else {
      await PostLikesModel.deleteOne({ postId, likedBy });

      return res.status(200).json({
        message: 'Like removed successfully',
      });
    }
  } catch (error) {
    console.error('Error in postLike:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { postLike };