//API controller
var fs = require('fs');
var logger = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/logger.js') : require('/www/master_control/logger.js'));


module.exports = {
	readDebug: function(req, res, next) {
		var filePath = (process.env.NODE_ENV == "DEV") ?  '/www/master_control_Dev/logs/debug.log' : '/www/master_control/logs/debug.log'; 
		fs.readFile(filePath, 'utf8', function(err, data) {
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

			for(entry in debugEntries) {
				debugEntries[entry].message = replaceAll(debugEntries[entry].message, "'", "\"");
			}

			req.logs = {
				debug: debugEntries
			};
			next();
		});
	},

	readInfo: function(req, res, next) {
		var filePath = (process.env.NODE_ENV == "DEV") ?  '/www/master_control_Dev/logs/info.log' : '/www/master_control/logs/info.log'; 
		fs.readFile(filePath, 'utf8', function(err, data) {
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

			for(entry in debugEntries) {
				debugEntries[entry].message = replaceAll(debugEntries[entry].message, "'", "\"");
			}

			req.logs = {
				info: debugEntries
			};
			next();
		});
	},

	readError: function(req, res, next) {
		var filePath = (process.env.NODE_ENV == "DEV") ?  '/www/master_control_Dev/logs/errors.log' : '/www/master_control/logs/errors.log'; 
		fs.readFile(filePath, 'utf8', function(err, data) {
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

			for(entry in debugEntries) {
				debugEntries[entry].message = replaceAll(debugEntries[entry].message, "'", "\"");
			}

			req.logs = {
				error: debugEntries
			};
			next();
		});
	},

	clearInfo: function(req, res, next) {
		var filePath = (process.env.NODE_ENV == "DEV") ?  '/www/master_control_Dev/logs/info.log' : '/www/master_control/logs/info.log'; 
		try { fs.unlinkSync(filePath); }
  		catch (ex) { }
  		finally {
  			next();
  		}
	},

	clearDebug: function(req, res, next) {
		var filePath = (process.env.NODE_ENV == "DEV") ?  '/www/master_control_Dev/logs/debug.log' : '/www/master_control/logs/debug.log'; 
		try { fs.unlinkSync(filePath); }
  		catch (ex) { }
  		finally {
  			next();
  		}
  	},

  	clearErrors: function(req, res, next) {
  		var filePath = (process.env.NODE_ENV == "DEV") ?  '/www/master_control_Dev/logs/errors.log' : '/www/master_control/logs/errors.log'; 
		try { fs.unlinkSync(filePath); }
  		catch (ex) { }
  		finally {
  			next();
  		}	
  	}
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}