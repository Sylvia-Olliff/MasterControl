var api = require('./controllers/API.js');
var monitor = require('./models/monitor.js');
//monitor.startDebugJob;

module.exports = function(args) {
	var express = args.express;
	var app = args.app;
	var logger = args.logger;
	var worker = args.worker;
	var router = express.Router();

	router.get('/readDebug', api.readDebug, function(req, res) {
		res.render(__dirname + '/views/logTable.ejs', {logs: req.logs.debug}, function(err, html) {
			if (err) {logger.log('error', err)};

			res.send(html);
		});
	});

	router.get('/readInfo', api.readInfo, function(req, res) {
		res.render(__dirname + '/views/logTable.ejs', {logs: req.logs.info}, function(err, html) {
			if (err) {logger.log('error', err)};

			res.send(html);
		});
	});

	router.get('/readError', api.readError, function(req, res) {
		res.render(__dirname + '/views/logTable.ejs', {logs: req.logs.error}, function(err, html) {
			if (err) {logger.log('error', err)};

			res.send(html);
		});
	});

	router.get('/readDebugCount', function(req, res) {
		var set = monitor.debugCount;
	});

	router.get('/clearInfo', api.clearInfo, function(req, res) {
		logger.log('info', "Logging reset...");
		res.send("Success");
	});

	router.get('/clearDebug', api.clearDebug, function(req, res) {
		logger.log('debug', "Logging reset...");
		res.send("Success");
	});

	router.get('/clearErrors', api.clearErrors, function(req, res) {
		logger.log('error', "Logging reset...");
		res.send("Success");
	});

	router.get('/clearAll', api.clearInfo, api.clearDebug, api.clearErrors, function(req, res) {
		logger.log('info', "Logging reset...");
		logger.log('debug', "Logging reset...");
		logger.log('error', "Logging reset...");
		res.send("Success");
	});

	router.get('/restartAll', function(req, res) {
		res.send("restarting...");

		process.send({
			TYPE: 'restartAll',
			FROM: 'Worker: ' + worker.id
		});
	});

	router.get('/test', function(req, res) {
		var test = monitor.debugCount();
		console.log(test);

		res.send(test);
	});


	process.on('message', function(message){
		if(message.TYPE === "shutdown") {
			process.exit(0);
		}
	});

	return router;
}