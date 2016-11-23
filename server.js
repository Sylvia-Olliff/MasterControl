/* Master Control Server for NODE.JS Sub-Apps
 * Author: Joe Olliff
 * Date: 07/25/2016
 * Description: This is the point of entry for all Node Servers. 
 *              A complete list of available services and documentation can be found at as400.rogers-brown.com:88/docs/
 */

var cluster = require('cluster');
require('dotenv').config();
var express 	 	= require('express');
var app     	 	= express();
var winston      	= require('winston');
var logger 			= require(__dirname + '/logger.js');	

if (cluster.isMaster) {

	var cpuCount = require('os').cpus().length;

	for (var i = 0; i < cpuCount; i++) {
		cluster.fork()
			.on('message', function(message){
				if (message.TYPE === "restartAll") {
					restartWorkers();
				} else {
					logger.log('debug', message);
				}
			});
	}

	cluster.on('exit', function(worker, code, signal){
		logger.log('error', "Worker " + worker.id + " died with code: " + code + " and signal: " + signal);

		if (code == 0) {
			logger.log('debug', "Worker " + worker.id + " voluntarily shutdown...");
		} else if (signal === "SIGKILL") {
			logger.log('debug', "Worker " + worker.id + " took too long, but was still voluntary");
		} 

		cluster.fork().on('message', function(message){
			if (message.TYPE === "restartAll") {
				restartWorkers();
			} else {
				logger.log('debug', message);
			}
		});
		logger.log('info', "Starting New Worker ");
	});



	function restartWorkers() {
		var wid, workerIDs = [];

		for (wid in cluster.workers) {
			workerIDs.push(wid);
		}

		workerIDs.forEach(function(wid) {
			cluster.workers[wid].send({
				TYPE: "shutdown",
				FROM: 'master'
			});

			setTimeout(function() {
				if (cluster.workers[wid]) {
					cluster.workers[wid].kill('SIGKILL');
				}
			}, 10000);
		});
	}

} else {

	//Declare Tools
	var async			= require('async');
	var server  	 	= require('http').createServer(app);
	var io      	 	= require('socket.io')(server);
	var ss 	 		 	= require('socket.io-stream');
	var fs           	= require('fs');
	var port    	 	= ((process.env.NODE_ENV == 'DEV') ? 8888 : 88);
	var morgan  	 	= require('morgan');
	var cookieParser 	= require('cookie-parser');
	var bodyParser   	= require('body-parser');
	var multer 		 	= require('multer');
	var methodOverride 	= require('method-override');
	var db 				= require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');

	//Server configuration
	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({
	  limit: '50mb',   
	  extended: true
	}));

	app.use('/css', express.static(__dirname + '/views/css/'));
	app.use('/js', express.static(__dirname +  '/views/js/'));
	app.use('/docs/', express.static(__dirname +  '/views/docs/'));
	app.use('/node/', express.static(__dirname + '/node_modules/'));
	app.set('view engine', 'ejs');

	//Establish Master Routing control
	var args = {
		app: app,
		async: async,
		db: db,
		express: express,
		io: io,
		ss: ss,
		fs: fs,
		winston: winston,
		logger: logger,
		methodOverride: methodOverride,
		worker: cluster.worker
	}

	require('./app/MasterRoutes.js')(args);

	server.listen(port);
	logger.log("info", "Worker " + cluster.worker.id + " is listening on port " + port);
}
