module.exports = function(args) {
	var fs = args.fs;
	var app = args.app;
	var winston = args.winston;

	fs.readdir(__dirname + '/subApps', function(err, files){
		if(err)
			throw err;

		app.get('/', function(req, res) {
			res.render('index.ejs');
		});

		args.subAppsNum = files.length;

		for (var i = files.length - 1; i >= 0; i--) {
			app.use("/" + files[i], require(__dirname + '/subApps/' + files[i])(args));
		}

		require(__dirname + '/controlers/miles-socket-controller.js')(args);

		app.get('/*', function(req, res){
			res.render('404.ejs');
		});

		app.post('/*', function(req, res){
			res.render('404.ejs');
		});

		app.use(function(err, req, res, next){
			winston.error("ERROR! Received: " + err.stack);
			res.render('500.ejs');
		});
	});
};


