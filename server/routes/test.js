const express = require('express');
const etherscanApi = require('../lib/etherscanApi');
const wallContract = require('../lib/wallContract');
const Message = require('../models/message');
const Event = require('../models/event');
const router = express.Router();

router.all('/', function(req, res, next) {
	return res.json({
		success: true,
		message: 'Hello Test API'
	});
});

router.all('/balance/:account', async function(req, res, next) {
	let account = req.params.account;
	let balance = await etherscanApi.account.balance(account);

	return res.json({
		success: true,
		balance: balance,
	});
});

// router.all('/store/:key/:value', async function(req, res, next) {
// 	//this will later be called from frontend
// 	let result = await wallContract.store(req.params.key, req.params.value);
// 	return res.json({
// 		success: true,
// 		result: result,
// 	});
// });

router.all('/pastEvents', async function(req, res, next) {
	try {
		let result = await Event.importPast();
		return res.json({
			success: true,
			result: result,
		});
	} catch (err) {
		return next(err);
	}
});

router.all('/error', function(req, res, next) {
	let AppError = require('../errors/AppErrors').AppError;
	throw new AppError('A Custom error');
});

module.exports = router;
