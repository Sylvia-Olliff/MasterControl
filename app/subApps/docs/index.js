module.exports = function(args) {
	var express = args.express;


	var router = express.Router();

	router.use('/css', express.static(__dirname + '/views/css/'));
	router.use('/js', express.static(__dirname +  '/views/js/'));
	router.use('/res', express.static(__dirname + '/views/Resources/'));

	router.get('/', function(req, res) {
		res.render(__dirname + '/views/index.ejs');
	});

	router.get('/addNew', function(req, res) {
		res.render(__dirname + '/views/New-Web/addNew.ejs');
	});

	router.get('/setupDev', function(req, res) {
		res.render(__dirname + '/views/Tutor-Guide/setupDev.ejs');
	});

	return router;

}