const Article = require("../../Models/ArticleModel");

const deleteArticle = async (req, res) => {
  try {
    const articleId = req.body.articleId;

    // Find the article by ID and delete it
    const result = await Article.deleteOne({ _id: articleId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
        deletedCount: result.deletedCount,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully',
      deletedCount: result.deletedCount,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = { deleteArticle };
