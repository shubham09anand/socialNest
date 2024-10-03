const express = require("express");

const router = express.Router();

const {createuserPost} = require('../Controller/Post/makePostController');
const {postComment} = require('../Controller/Post/Comments/CommentOnPostController');
const {getPostComment} = require('../Controller/Post/Comments/getCommentOfPostController');
const {postLike} = require('../Controller/Post/Likes/PostLikesController');
const { PostDetails } = require("../Controller/Post/getPostDetails");
const { deletePost } = require("../Controller/Post/deletePostController");

router.post('/makePost', createuserPost);
router.post('/deletePost', deletePost);
router.post('/makeComment', postComment);
router.post('/getPostComment', getPostComment);
router.post('/giveLike', postLike);
router.post('/postDetails', PostDetails);

module.exports = router;