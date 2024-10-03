const express = require("express");

const router = express.Router();

const { getUserProfile } = require("../Controller/settings/getUserProfileController");
const { updateProfile } = require("../Controller/settings/updateProfile");
const { updatePassword } = require("../Controller/settings/updatePassowrd");

router.post('/getUserProfile', getUserProfile);
router.post('/updateProfile', updateProfile);
router.post('/updatePassword', updatePassword);

module.exports = router;