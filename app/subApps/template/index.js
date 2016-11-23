module.exports = function(args) {
	var express = args.express;
	var router = express.Router();
	
	router.use('/css', express.static(__dirname + '/views/dist/css/'));
	router.use('/js', express.static(__dirname +  '/views/dist/js/'));
	router.use('/img', express.static(__dirname + '/views/dist/img/'))
	router.use('/mod', express.static(__dirname + '/models/'));

	router.get('/', function(req, res) {
		res.render(__dirname + '/views/index.ejs');
	});

	return router;

}