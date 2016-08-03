
module.exports = function(args) {
	var express = args.express;

	var router = express.Router();

	router.get('/', function(req, res) {
		res.send("Test Success");
	});


	return router;
}
