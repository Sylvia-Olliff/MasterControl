module.exports = function(args) {
	var express = args.express;
	var logger = args.logger;
	var worker = args.worker;
	var router = express.Router();
	var status = require(__dirname + '/controllers/AdminStatus.js')

	router.use('/css', express.static(__dirname + '/views/dist/css/'));
	router.use('/js', express.static(__dirname +  '/views/dist/js/'));
	router.use('/images', express.static(__dirname + '/views/dist/img/'))
	router.use('/mod', express.static(__dirname + '/models/'));
	router.use('/dist', express.static(__dirname + '/views/dist/'));
	

	router.get('/', status.referencesList, status.programsList, function(req, res) {
		res.render(__dirname + '/views/index.ejs', {subApps: args.subAppsNum, connections: req.connections, programs: req.programs}, function(err, html) {
			if (err) {logger.log('error', err);}

			res.send(html);
		});
	});

	router.get('/*', function(req, res) {
		res.render(__dirname + '/views/' + req.params[0]);
	});

	return router;

}