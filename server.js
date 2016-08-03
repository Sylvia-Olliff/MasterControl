/* Master Control Server for NODE.JS Sub-Apps
 * Author: Joe Olliff
 * Date: 07/25/2016
 * Description: This is the point of entry for all Node Servers. 
 *              A complete list of available services and documentation can be found at as400.rogers-brown.com:88/docs/
 */


//Declare Tools
var express 	 = require('express');
var app     	 = express();
var server  	 = require('http').createServer(app);
var io      	 = require('socket.io')(server);
var ss 	 		 = require('socket.io-stream');
var fs           = require('fs');
var port    	 = 88;
var morgan  	 = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var multer 		 = require('multer');
var winston      = require('winston');
var db 			 = require('/QOpenSys/QIBM/ProdData/Node/os400/db2i/lib/db2');


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
app.set('view engine', 'ejs');

// Loggng configurations
winston.add(
	winston.transports.File,
	{
		filename: '/www/master_control/logs/info.log',
		level: 'info',
		json: true,
		eol: '\n',
		timestamp: true,
		handleExceptions: true
	}
);

//Establish Master Routing control

var args = {
	app: app,
	db: db,
	express: express,
	io: io,
	ss: ss,
	fs: fs,
	winston: winston
}

require('./app/MasterRoutes.js')(args);

server.listen(port);
winston.info("The server is listening on port " + port);
