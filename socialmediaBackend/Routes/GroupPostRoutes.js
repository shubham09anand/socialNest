const express = require("express");

const router = express.Router();

const { CreateGroupPost } = require('../Controller/Group/GroupPost/CreatePost');
const { fetchGroupPost } = require("../Controller/Group/GroupPost/FetchPost");
const { GroupPostComment } = require("../Controller/Group/GroupPost/PostComment");
const { fetchPostComment } = require("../Controller/Group/GroupPost/FetchPostCommnet");
const { DeletePost } = require("../Controller/Group/GroupPost/DeletePost");
const { GroupPostLike } = require("../Controller/Group/GroupPost/GroupPostLike");
const { GetPostCommentCount } = require("../Controller/Group/GroupPost/LikeAndCommnetCount");

router.post('/createGroupPost', CreateGroupPost);
router.post('/fetchGroupPost', fetchGroupPost);
router.post('/makeGroupPostComment', GroupPostComment);
router.post('/fetchPostComment', fetchPostComment);
router.post('/deleteGroupPost', DeletePost);
router.post('/groupPostLike', GroupPostLike);
router.post('/postLikeAndCommnetCount', GetPostCommentCount);

module.exports = router;