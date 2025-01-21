const express = require("express");

const router = express.Router();

const { countInfo } = require ("../Controller/ProfileInfo/userDetails");
const { profilePicture } = require("../Controller/GetProfilePic");

router.post('/userDetails', countInfo);
router.post('/profilePicture', profilePicture);

module.exports = router;