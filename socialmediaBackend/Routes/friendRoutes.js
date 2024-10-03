const express = require("express");

const {newFriendRequest} = require('../Controller/Friend/sendRequest/sendRequest');
const {recivedFriendRequest} = require('../Controller/Friend/recivedRequest/recivedRequest');
const { processFriendRequest } = require("../Controller/Friend/processAction/recivedRequestProcess");
const { deleteSendedRequest } = require("../Controller/Friend/processAction/sendedRequestProcess");
const { sendedRequest } = require("../Controller/Friend/sendedRequest/sendedRequest");
const { friendList } = require("../Controller/Friend/friendList/getFrinedList");
const { removeFriend } = require("../Controller/Friend/DeleteFriend/DeleteFriendController");

const router = express.Router();

router.post('/sendFriendRequest', newFriendRequest);
router.post('/recivedFriendRequest', recivedFriendRequest);
router.post('/processFriendRequest', processFriendRequest);
router.post('/sendedRequest', sendedRequest);
router.post('/deleteSendedRequest', deleteSendedRequest);
router.post('/friendList', friendList);
router.post('/removeFriend', removeFriend);

module.exports = router;