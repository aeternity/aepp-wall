const express = require('express');
const router = express.Router();
const Message = require('../models/message');


router.all('/', function(req, res, next) {
	return res.json({
		success: true,
		message: 'Hello Messages API'
	});
});

router.all('/list', async function(req, res, next) {
	let messages = await Message.findList();
	return res.json({
		success: true,
		messages: messages
	});
});

module.exports = router;
