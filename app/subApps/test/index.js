
module.exports = function(args) {
	var express = args.express;
	var io = args.io;
	var ss = args.ss;
	var logger = args.logger;
	var db = args.db;

	var router = express.Router();

	
	// io.sockets.on('connection', function(socket){
	// 	logger.log('info', "successful connection to test");

	// 	socket.on('test', function(data){
	// 		logger.log('info', "test event was fired!");
	// 		socket.emit('testBack', "Test Successful");
	// 	});

	// });

	router.get('/', function(req, res) {
		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT * FROM JOELIB.TEMP", function(results){
			if (results !== undefined && results.length != 0) {
				logger.log('info', results);
				res.send("Test Success");		
			} else {
				console.log("Error in test");
				res.send("Test Success");
			}
		});
		// res.send("Test Success");
	});


	return router;
}
