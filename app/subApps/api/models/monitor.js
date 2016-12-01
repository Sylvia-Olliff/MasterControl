var logger = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/logger.js') : require('/www/master_control/logger.js'));
var CronJob = require('cron').CronJob;

const TIMEZONE = "America/New_York";
const MAX_COUNT = 2880;

var ENV = process.env.NODE_ENV;
var countLog = [];
var lastCount = 0;
var currentCount = 0;
var firstRead = true;


module.exports = {
	debugCount: function() {
		if (countLog.length > 10) {
			var responseSet = [];

			for (var i = countLog.length - 11; i < countLog.length; i++) {
				responseSet.push(countLog[i]);
			}

			console.log(responseSet);

			return responseSet;
		} else {
			return false;
		}
	},
	startDebugJob: function() {
		// monDebug.start();
	}
}