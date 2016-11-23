var winston = require('winston');
var moment = require('moment-timezone');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({
			name: 'info-log',
			filename: __dirname + '/logs/info.log',
			level: 'info',
			eol: '\n',
			timestamp: function() {
    			return moment(new Date()).tz("America/New_York").format();
			},
			handleExceptions: false
		}),
		new (winston.transports.File)({
			name: 'error-log',
			filename: __dirname + '/logs/errors.log',
			level: 'error',
			eol: '\n',
			timestamp: function() {
    			return moment(new Date()).tz("America/New_York").format();
			},
			handleExceptions: true,
			humanReadableUnhandledException: true
		}),
		new (winston.transports.File)({
			name: 'debug-log',
			filename: __dirname + '/logs/debug.log',
			level: 'debug',
			eol: '\n',
			timestamp: function() {
    			return moment(new Date()).tz("America/New_York").format();
			},
			handleExceptions: false
		})
	]
});

module.exports = logger;
