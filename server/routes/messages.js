let express = require('express');
let router = express.Router();

router.all('/', function(req, res, next) {
	return res.json({
		success: true,
		message: 'Hello Messages API'
	});
});

module.exports = router;
