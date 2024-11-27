const express = require("express");

const router = express.Router();

const {sendMessage} = require('../Controller/Messages/sendMessageController');
const {getMessage} = require('../Controller/Messages/getMessagesController');
const { contactList } = require("../Controller/Messages/getContactList");
const { deleteMessage } = require("../Controller/Messages/deletMessage");

router.post('/sendMessage', sendMessage);
router.post('/getMessage', getMessage);
router.post('/contactList', contactList);
router.post('/deleteMessage', deleteMessage);

module.exports = router;