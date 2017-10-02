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
	try {
		let messages = await Message.findList();
		return res.json({
			success: true,
			messages: messages
		});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
