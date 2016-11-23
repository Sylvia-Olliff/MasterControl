module.exports = function(args) {
	var express = args.express;
	var router = express.Router();
	var componentController = require(__dirname + '/controllers/componentController.js');
	
	router.use('/css', express.static(__dirname + '/views/css/'));
	router.use('/js', express.static(__dirname +  '/views/js/'));
	router.use('/res', express.static(__dirname + '/views/Resources/'));
	router.use('/mod', express.static(__dirname + '/models/'));

	router.get('/', function(req, res) {
		res.render(__dirname + '/views/index.ejs');
	});

	router.get('/addNew', function(req, res) {
		res.render(__dirname + '/views/New-Web/addNew.ejs');
	});

	router.get('/setupDev', function(req, res) {
		res.render(__dirname + '/views/Tutor-Guide/setupDev.ejs');
	});

	router.get('/rbnalRate', function(req, res){
		res.render(__dirname + '/views/Tutor-Guide/rbnal-rate-system-design.ejs');
	});

	router.post('/component', componentController.getDetails, function(req, res){
		res.render(__dirname + '/views/Tutor-Guide/component-detail.ejs', {
			component: req.component
		});
	});

	return router;

}