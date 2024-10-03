const express = require("express");

const router = express.Router();

const { countInfo } = require ("../Controller/ProfileInfo/userDetails");

router.post('/userDetails', countInfo);

module.exports = router;