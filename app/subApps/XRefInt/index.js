module.exports = function(args) {
	var express = args.express;
	var logger = args.logger;
	var methodOverride = args.methodOverride;
	var router = express.Router();
	var processor = require(__dirname + '/controllers/EntrySetProcessor.js');

	router.use('/css', express.static(__dirname + '/views/css/'));
	router.use('/js', express.static(__dirname +  '/views/js/'));
	router.use('/res', express.static(__dirname + '/views/Resources/'));
	router.use(methodOverride());

	router.get('/', function(req, res){
		res.render(__dirname + '/views/index.ejs');
	});

	router.post('/addSet', processor.process, function(req, res){
		var response = req.result.msg;
		logger.log('info', response);

		res.send(response);
	});

	router.use(function(err, req, res, next){
		logger.log('error-log', err);
		next();
	});
	
	return router;
}