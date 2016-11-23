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

	router.get('/readDebugCount', function(req, res) {
		var set = monitor.debugCount;
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