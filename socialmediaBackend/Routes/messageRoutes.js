const express = require("express");

const router = express.Router();

const { sendMessage } = require('../Controller/Messages/sendMessageController');
const { getMessage } = require('../Controller/Messages/getMessagesController');
const { contactList } = require("../Controller/Messages/getContactList");
const { deleteMessage } = require("../Controller/Messages/deletMessage");


const { CreateGroup } = require("../Controller/Group/GroupBasic/CreateGroup")
const { GroupJoing } = require("../Controller/Group/GroupBasic/GroupJoingRequest");
const { GetGroupList } = require("../Controller/Group/GroupBasic/FetchJoinedGroupList");
const { GetgroupInfo } = require("../Controller/Group/GroupBasic/GroupInfo");
const { LeaveGroup } = require("../Controller/Group/GroupBasic/LeaveGroup");
const { UpdateGroupInfo } = require("../Controller/Group/GroupBasic/UpdateGroupInfo");

const { RemoveMemberByAdmin } = require("../Controller/Group/GroupBasic/RemoveMemberByAdmin");
const { RemoveAdmin } = require("../Controller/Group/GroupBasic/RemoveAdmin");
const { MakeMoreAdmin } = require("../Controller/Group/GroupBasic/MakeMoreAdmin");
const { ProcessJoingRequest } = require("../Controller/Group/GroupBasic/ProcessJoingRequest");
const { FetchAllPendingRequest } = require("../Controller/Group/GroupBasic/FetchAllPendingRequest");
const { GroupMemberList } = require("../Controller/Group/GroupBasic/GroupMemberList");
const { NotJoinedGroup } = require("../Controller/Group/GroupBasic/NotJoinedGroup");
const { CheckReuestStatus } = require("../Controller/Group/GroupBasic/CheckReuestStatus");


router.post('/sendMessage', sendMessage);
router.post('/getMessage', getMessage);
router.post('/contactList', contactList);
router.post('/deleteMessage', deleteMessage);

router.post('/createMessageGroup', CreateGroup);
router.post('/groupJoing', GroupJoing);
router.post('/groupList', GetGroupList);
router.post('/groupInfo', GetgroupInfo);
router.post('/leaveGroup', LeaveGroup);
router.post('/updateGroup', UpdateGroupInfo);

router.post('/removeMemberByAdmin', RemoveMemberByAdmin);
router.post('/removeAdmin', RemoveAdmin);
router.post('/makeMoreAdmin', MakeMoreAdmin);
router.post('/processJoingRequest', ProcessJoingRequest);
router.post('/fetchAllPendingRequest', FetchAllPendingRequest);
router.post('/groupMemberList', GroupMemberList);
router.post('/notJoinedGroup', NotJoinedGroup);
router.post('/checkReuestStatus', CheckReuestStatus);



module.exports = router;