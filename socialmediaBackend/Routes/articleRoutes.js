const express = require("express");

const router = express.Router();

const {createArticle} = require('../Controller/Other/ArticleController');
const { getArticle } = require("../Controller/Other/getAllArticles");
const { getRequestedArticle } = require("../Controller/Other/getReuestedArticleController");
const { deleteArticle } = require("../Controller/Other/deleteArticle");

router.post('/createArticle',  createArticle);
router.get('/getArticle', getArticle);
router.get('/getRequestedArticle?/:articleId', getRequestedArticle);
router.post('/deleteArticle', deleteArticle);


module.exports = router;