const express = require("express");

const router = express.Router();

const {sendMessage} = require('../Controller/Messages/sendMessageController');
const {getMessage} = require('../Controller/Messages/getMessagesController');
const { contactList } = require("../Controller/Messages/getContactList");
const { deleteMessage } = require("../Controller/Messages/deletMessage");

const { createMessageGroup } = require("../Controller/Group/messageGroup");
const { GroupJoing } = require("../Controller/Group/GroupJoingRequest");
const { LeaveGroup } = require("../Controller/Group/LeaveGroup");
const { RemoveMemberByAdmin } = require("../Controller/Group/RemoveMemberByAdmin");
const { MakeMoreAdmin } = require("../Controller/Group/MakeMoreAdmin");
const { ProcessJoingRequest } = require("../Controller/Group/ProcessJoingRequest");


router.post('/sendMessage', sendMessage);
router.post('/getMessage', getMessage);
router.post('/contactList', contactList);
router.post('/deleteMessage', deleteMessage);

router.post('/createMessageGroup', createMessageGroup);
router.post('/groupJoing', GroupJoing);
router.post('/leaveGroup', LeaveGroup);
router.post('/removeMemberByAdmin', RemoveMemberByAdmin);
router.post('/makeMoreAdmin', MakeMoreAdmin);
router.post('/processJoingRequest', ProcessJoingRequest);

module.exports = router;