const express = require("express");

const router = express.Router();

const {sendMessage} = require('../Controller/Messages/sendMessageController');
const {getMessage} = require('../Controller/Messages/getMessagesController');
const { contactList } = require("../Controller/Messages/getContactList");
const { deleteMessage } = require("../Controller/Messages/deletMessage");


const { GroupJoing } = require("../Controller/Group/GroupJoingRequest");
const { GetGroupList } = require("../Controller/Group/FetchGroupList");
const { UpdateGroupInfo } = require("../Controller/Group/UpdateGroupInfo");
const { LeaveGroup } = require("../Controller/Group/LeaveGroup");
const { RemoveMemberByAdmin } = require("../Controller/Group/RemoveMemberByAdmin");
const { RemoveAdmin } = require("../Controller/Group/RemoveAdmin");
const { MakeMoreAdmin } = require("../Controller/Group/MakeMoreAdmin");
const { ProcessJoingRequest } = require("../Controller/Group/ProcessJoingRequest");
const { GroupMessage } = require("../Controller/Group/GroupMessaging");
const { FetchGroupMessage } = require("../Controller/Group/FetchGroupMessage");
const { DeleteGroupmessage } = require("../Controller/Group/DeleteGroupMessage");
const { FetchAllPendingRequest } = require("../Controller/Group/FetchAllPendingRequest");
const { GroupMemberList } = require("../Controller/Group/GroupMemberList");
const { CreateGroup } = require("../Controller/Group/CreateGroup");
const { GetgroupInfo } = require("../Controller/Group/GroupInfo");
const { getPendingMessage } = require("../Controller/Group/GroupFetchScheduleMessage");
const { handleGroupPendingScheduleMessage } = require("../Controller/Group/GroupPendingScheduleMessage");
const { handleGroupPendingMessgaeDelete } = require("../Controller/Group/GroupDeletePendingMessage");
const { ProcessSchedulingMessage } = require("../Controller/Group/GroupProcessSchedulingMessage");


router.post('/sendMessage', sendMessage);
router.post('/getMessage', getMessage);
router.post('/contactList', contactList);
router.post('/deleteMessage', deleteMessage);

router.post('/createMessageGroup', CreateGroup);
router.post('/groupList', GetGroupList);
router.post('/groupInfo', GetgroupInfo);
router.post('/groupJoing', GroupJoing);
router.post('/leaveGroup', LeaveGroup);
router.post('/updateGroup', UpdateGroupInfo);
router.post('/removeMemberByAdmin', RemoveMemberByAdmin);
router.post('/removeAdmin', RemoveAdmin);
router.post('/makeMoreAdmin', MakeMoreAdmin);
router.post('/processJoingRequest', ProcessJoingRequest);
router.post('/sendGroupMessage', GroupMessage);
router.post('/fetchGroupMessage', FetchGroupMessage);
router.post('/deleteGroupmessage', DeleteGroupmessage);
router.post('/fetchAllPendingRequest', FetchAllPendingRequest);
router.post('/groupMemberList', GroupMemberList);


router.post('/getPendingMessage', getPendingMessage);
router.post('/groupPendingScheduleMess', handleGroupPendingScheduleMessage);
router.post('/groupPendingMessageDelete', handleGroupPendingMessgaeDelete);
router.post('/processSchedulingMessage', ProcessSchedulingMessage);


module.exports = router;