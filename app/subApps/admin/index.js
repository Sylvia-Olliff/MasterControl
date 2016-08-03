module.exports = function(args) {
	var express = args.express;
	var io = args.io;
	var fs = args.fs;
	var db = args.db;

	var router = express.Router();

	router.use('/css', express.static(__dirname + '/views/css/'));
	router.use('/js', express.static(__dirname +  '/views/js/'));
	router.use('/res', express.static(__dirname + '/views/Resources/'));
	router.use('/node', express.static('/www/master_control/'));
	router.use('/view', express.static(__dirname + '/views/snippets/'));
	

	router.get('/', function(req, res) {
		res.render(__dirname + '/views/index');
	});

	router.post('/login', function(req, res) {
		var user = req.body.loginData.username;
		var pass = req.body.loginData.password;

		try{
			db.init(function() {
				db.serverMode(true);
			});
			db.conn("*LOCAL", user, pass);
			db.exec("SELECT COUNT(*) as LOGIN FROM QS36F.FSECF001 WHERE SEUSER = 'OLLIFFJ' AND SEPGM = 'RBNLADMINW'", function(results) {
				if (results[0].LOGIN > 0) {
					res.send("SUCCESS");
				} else {
					res.send("ACCESS");
				}
			});
			db.close();
		} catch (e) {
			if (e.message.substring(0,14) == "SQLSTATE=08001") {
				console.log(e.name + " : Unauthorized Access Attempt by " + user);
				res.send("INVALID");
			} else {
				console.log(e.name + " : " + e.message);
				res.send("ERROR");
			}
		}
	});

	var programs = require("./models/programs");

	router.post('/config', function(req, res) {
		//TODO: Add parameter to get request for the name of the program, 
		//      use the programs variable below to look up necessary info
		var pgm = req.body.pgm;
		fs.readFile(programs.directory + programs.list[pgm].config, 'utf8', function(err, data){
			if (err) throw err;
			console.log(data);
			res.send("");
		});

	});

	var previousRead = "";

	var testResponse = io
		.of('/test')
		.on('connection', function(socket){
			console.log("Test received");
			testResponse.emit('running');
		});

	var debugInfo = io
		.of('/config')
		.on('connection', function(socket){
			console.log("User connected");

			socket.on('start', function(pgm){
				console.log("Received start command");
				debugInfo.emit('starting');

				if (programs.list[pgm.name].active) {
					console.log("Program is active");
					checkDebug();
					socket.on('stop', function(){
						console.log("Stop command sent");
						clearInterval(checkDebugInterval);
						previousRead = "";
					});

					socket.on('disconnect', function(){
						console.log("User Disconnected");
						clearInterval(checkDebugInterval);
						previousRead = "";
					});

					socket.on('clear', function(){
						console.log("clear file message received");
						fs.writeFile(programs.directory + programs.list[pgm.name].debug, '', 'utf8', function(){});
					});
					
					var checkDebugInterval = setInterval(checkDebug, 5000);
					

				} else {
					debugInfo.emit('inactive');
				}

				function checkDebug(){
					console.log("Reading file");
					fs.readFile(programs.directory + programs.list[pgm.name].debug, 'utf8', function(err, data){
						if (err) throw err;
										
						if (previousRead != data) {
							previousRead = data;
							debugInfo.emit('log', {debug: data});
						}
					});
				}
			});
		});


	return router;

}