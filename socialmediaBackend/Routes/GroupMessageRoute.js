const express = require("express");

const router = express.Router();

const { GroupMessage } = require("../Controller/Group/GroupMessage/GroupMessaging");
const { FetchGroupMessage } = require("../Controller/Group/GroupMessage/FetchGroupMessage");
const { DeleteGroupmessage } = require("../Controller/Group/GroupMessage/DeleteGroupMessage");

const { getPendingMessage } = require("../Controller/Group/GroupMessage/GroupFetchScheduleMessage");
const { handleGroupPendingScheduleMessage } = require("../Controller/Group/GroupMessage/GroupPendingScheduleMessage");
const { handleGroupPendingMessgaeDelete } = require("../Controller/Group/GroupMessage/GroupDeletePendingMessage");
const { ProcessSchedulingMessage } = require("../Controller/Group/GroupMessage/GroupProcessSchedulingMessage");


router.post('/sendGroupMessage', GroupMessage);
router.post('/fetchGroupMessage', FetchGroupMessage);
router.post('/deleteGroupmessage', DeleteGroupmessage);

router.post('/getPendingMessage', getPendingMessage);
router.post('/groupPendingScheduleMess', handleGroupPendingScheduleMessage);
router.post('/groupPendingMessageDelete', handleGroupPendingMessgaeDelete);
router.post('/processSchedulingMessage', ProcessSchedulingMessage);

module.exports = router;