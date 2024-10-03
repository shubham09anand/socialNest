const express = require("express");

const router = express.Router();

const {filterUser} = require('../Controller/Search(Filter)/filterUserController');
const { searchedPerosnPost } = require("../Controller/Search(Filter)/searchedPerosnPost");
const { getFriendShipStatus } = require("../Controller/Search(Filter)/checkFreiendshipStatus");
const { getFriendRequestStatus } = require("../Controller/Search(Filter)/checkPendingFriendRequest");

router.post('/filterUser', filterUser);
router.post('/searchedPerosnPost', searchedPerosnPost);
router.post('/checkFreiendshipStatus', getFriendShipStatus);
router.post('/checkFriendRequestStatus', getFriendRequestStatus);

module.exports = router;