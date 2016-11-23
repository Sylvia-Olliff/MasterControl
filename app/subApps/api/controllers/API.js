//API controller
var fs = require('fs');
var logger = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/logger.js') : require('/www/master_control/logger.js'));


module.exports = {
	readDebug: function(req, res, next) {
		if (process.env.NODE_ENV == "DEV") {
			fs.readFile('/www/master_control_Dev/logs/debug.log', 'utf8', function(err, data) {
				if (err) {
					logger.log('error', err);
				}

				var debugEntries = data.split('\n');

				for(entry in debugEntries) {
					if (debugEntries[entry].length > 0) {
						debugEntries[entry] = JSON.parse(debugEntries[entry]);
					} else {
						debugEntries.splice(entry, 1);
					}
				}

				req.logs = {
					debug: debugEntries
				};
				next();
			});
		} else if (process.env.NODE_ENV == "PRO") {

		}
	},

	readLog: function(req, res, next) {
		if (process.env.NODE_ENV == "DEV") {
			fs.readFile('/www/master_control_Dev/logs/info.log', 'utf8', function(err, data) {
				if (err) {
					logger.log('error', err);
				}

				var debugEntries = data.split('\n');

				for(entry in debugEntries) {
					if (debugEntries[entry].length > 0) {
						debugEntries[entry] = JSON.parse(debugEntries[entry]);
					} else {
						debugEntries.splice(entry, 1);
					}
				}

				req.logs = {
					debug: debugEntries
				};
				next();
			});
		} else if (process.env.NODE_ENV == "PRO") {

		}
	},

	readError: function(req, res, next) {
		if (process.env.NODE_ENV == "DEV") {
			fs.readFile('/www/master_control_Dev/logs/error.log', 'utf8', function(err, data) {
				if (err) {
					logger.log('error', err);
				}

				var debugEntries = data.split('\n');

				for(entry in debugEntries) {
					if (debugEntries[entry].length > 0) {
						debugEntries[entry] = JSON.parse(debugEntries[entry]);
					} else {
						debugEntries.splice(entry, 1);
					}
				}

				req.logs = {
					debug: debugEntries
				};
				next();
			});
		} else if (process.env.NODE_ENV == "PRO") {

		}
	}
}