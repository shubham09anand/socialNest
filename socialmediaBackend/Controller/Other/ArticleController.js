const Article = require("../../Models/ArticleModel");

const createArticle = async (req, res) => {
  try {
    const articleData = req.body;
    
    const savedArticle = await Article.create(articleData);

    return res.status(201).json({ 
      success: true, 
      status: 1, 
    });
    
  } catch (error) {

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });

  }
};

module.exports = { createArticle };
