const express = require('express');
const config = require('./config');
const watcher = require('./lib/watcher');
const app = express();

watcher.start(event => {
	console.log('got event', event);
});

app.all('/', async function(req, res, next) {
	return res.json({
		success: true,
		message: 'Hello Aeternity Wall API',
	});
});

app.use('/messages', require('./routes/messages'));
app.use('/test', require('./routes/test'));

// ---------------- 404 Error Handler ----------------

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// ---------------- Error Handlers ----------------

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(err.status || 500);
	res.json({
		success: false,
		error: {
			code: err.code,
			name: err.name,
			message: err.message
		},
		stack: err.stack
	});
	//TODO: dont print stack in production
});

var port = process.env.PORT || config.port;
app.listen(port, function () {
	console.log('Example app listening on port', port);
});
