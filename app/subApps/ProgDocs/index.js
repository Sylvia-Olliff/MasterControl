module.exports = function(args) {
	var express = args.express;
	var worker = args.worker;
	var logger = args.logger;
	var router = express.Router();

	var inputHandler = require('./controllers/InputHandler.js');
	var viewHandler = require('./controllers/ViewHandler.js');
	
	router.use('/css', express.static(__dirname + '/views/dist/css/'));
	router.use('/js', express.static(__dirname +  '/views/dist/js/'));
	router.use('/img', express.static(__dirname + '/views/dist/img/'))
	router.use('/mod', express.static(__dirname + '/models/'));

	router.get('/', function(req, res) {
		logger.log('info', "Worker " + worker.id + " recieved ProgDocs/index request");
		res.render(__dirname + '/views/index.ejs', {ENV: process.env.NODE_ENV}, function(err, html){
			if (err) {logger.log('error', err);}

			res.send(html);
		});
	});

	router.get('/addComponent', function(req, res) {
		logger.log('info', "Worker " + worker.id + " received ProgDocs/addComponent request");

		res.render(__dirname + '/views/programComponent.ejs');
	});

	router.get('/addPrograms', function(req, res) {
		logger.log('info', "Worker " + worker.id + " received ProgDocs/addPrograms request");

		res.render(__dirname + '/views/addPrograms.ejs');
	});

	router.get('/viewProgram', function(req, res) {
		logger.log('info', "Worker " + worker.id + " received ProgDocs/viewProgram request");

		res.render(__dirname + '/views/viewProgram.ejs', {ENV: process.env.NODE_ENV}, function(err, html) {
			if (err) {logger.log('error', err);}

			res.send(html);
		});

	});

	router.post('/viewProgram/findProgram', viewHandler.viewCallsRef, viewHandler.viewCalledRef, viewHandler.viewMain, function(req, res) {
		logger.log('info', "Worker " + worker.id + " received ProgDocs/findProgram post");

		res.render(__dirname + '/views/programUpdate.ejs', {pgmData: req.pgmData}, function(err, html) {
			if (err) {logger.log('error', err);}

			res.send(html);
		});
	});

	router.post('/viewProgram/updateProgram', inputHandler.processUpdateReferences, inputHandler.processUpdate, function(req, res) {
		if (req.error !== undefined) {
			res.send(req.error.msg);
		} else {
			res.send("Update Successful");
		}
	})

	router.post('/submitProgData', inputHandler.processProgram, inputHandler.processReferences, inputHandler.processComponents, function(req, res) {
		logger.log('info', "Worker " + worker.id + " received ProgDocs/submitProgData post");		

		logger.log('debug', req.body);

		res.send("ACCEPTED");
	});

	return router;

}