const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    articleTitle: {
      type: String,
      required: true,
    },
    articlePhotos: [
      {
        type: String,
        required: false,
      },
    ],
    articleTags: [
      {
        type: String,
        required: true,
      },
    ],
    paragraphs: [
      {
        title: {
          type: String,
          default:null,
        },
        content: {
          type: String,
          default:null,
        },
      },
    ],
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema, 'ArticleCollection');

module.exports = Article;
