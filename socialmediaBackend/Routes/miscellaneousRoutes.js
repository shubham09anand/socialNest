const express = require("express");

const router = express.Router();

const { AIchat } = require("../Controller/miscellaneousControllers/aiChat");

router.get('/aiResponse', AIchat);

module.exports = router;