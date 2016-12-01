//Formats and prepares Program Header, Detail, and Component documentation information to be entered into the Database

var db = require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');
var logger = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/logger.js') : require('/www/master_control/logger.js'));
var async = require('async');

module.exports = {
	processProgram: function(req, res, next) {
		var name 		= req.body.pgmName,
			type 		= req.body.pgmType,
			system 		= req.body.system,
			proDateStr 	= req.body.proDate,
			reqBy		= req.body.reqBy,
			department 	= req.body.department,
			location	= req.body.location,
			reqDateStr	= req.body.reqDate,
			design		= req.body.design,
			pgmTask		= req.body.pgmTask,
			pgmDesc		= req.body.pgmDesc,
			pgmFiles	= req.body.pgmFiles;

		var funcKeys = "";

		if (req.body.funcKeys != undefined) {
			for (var i = 0; i < req.body.funcKeys.length; i++) {
				funcKeys += req.body.funcKeys[i] + ",";
			}
			funcKeys = funcKeys.slice(0, funcKeys.length - 1);
		}

		var proDate = formatDate(proDateStr.slice(0,4), proDateStr.slice(4,6) - 1, proDateStr.slice(6, 8));
		var reqDate = formatDate(reqDateStr.slice(0,4), reqDateStr.slice(4,6) - 1, reqDateStr.slice(6, 8));
		var curDate = formatDate(new Date);
		var date = new Date();
		var curTime = date.getHours() - 5 + ":" + date.getMinutes() + ":" + date.getSeconds();

		logger.log('debug', proDate + " : " + reqDate + " : " + curDate);

		// First check to see if this program already exists in the docs file.
		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT COUNT(*) as EXISTS FROM JOELIB.SYSDOCPP WHERE SPPGM = '" + name + "'", 
			function(results) {
				if (results !== undefined && results.length != 0) {
					if (results[0].EXISTS > 0) {
						req.DocsRes = {
							ERROR: "Program Documentation Already Exists"
						}
						next();
					} else {
						//Continue on to add documentation to files
						var insertString = " INSERT INTO JOELIB.SYSDOCPP (SPPGM, SPTYPE, SPREQ, SPDEP, SPSYSTEM, SPLOCAL, SPDATREQ, SPDATPRO, SPDESIGN, SPFUNC, SPFILES, SPDESC, SPTASK, SPCDAT, SPCTIM, SPCPGM, SPCUSR) VALUES " +
										   " ( '" + name + "', '" + type + "', '" + reqBy + "', '" + department + "', '" + system + "', '" + location + ", " + reqDate + "', '" + proDate + "', '" + design + "', '" + funcKeys + "', '" + pgmFiles + "', '" + pgmDesc + "', '" + pgmTask + "', '" + curDate + "', '" + curTime + "', 'PROGDOC', 'WEBUSER') with NC";

						try {
							db.init();
							db.conn("*LOCAL", function() {
								db.autoCommit(true);
							});
							db.exec(insertString, function(insertResults) {
								next();
							});
						} catch (e) {
							logger.log('error', "Name: " + e.name + ", Message: " + e.message + ", Stack: " + e.stack );
						} finally {
							next();
						}
					}
				}
		});
	},

	processReferences: function(req, res, next) {
		var name 		= req.body.pgmName,
			calledBySet	= req.body.calledBy.split(","),
			callsSet	= req.body.calls.split(",");		

		var curDate = formatDate(new Date);
		var date = new Date();
		var curTime = date.getHours() - 5 + ":" + date.getMinutes() + ":" + date.getSeconds();

		var insertSets = [];
		if (callsSet[0] != "Comma separate each program name.") {
			for (var i = 0; i < callsSet.length; i++) {
				insertSets.push(referencesFunc.bind(null, { name: name, calls: callsSet[i]}));
			}
		}

		if (calledBySet[0] != "Comma separate each program name.") {
			for (var i = 0; i < calledBySet.length; i++) {
				insertSets.push(referencesFunc.bind(null, { name: calledBySet[i], calls: name}));
			}
		}

		try {
			async.parallel(insertSets, function(err, results) {
				if(err) {throw err;}
				next();
			});
		} catch (e) {
			logger.log('error', "Name: " + e.name + ", Message: " + e.message + ", Stack: " + e.stack );
		} finally {
			next();
		}
	},

	processComponents: function(req, res, next) {
		var pgmName = req.body.pgmName;
		var count = 1;
		var names  = [];
		var files  = [];
		var tasks  = [];
		var logics = [];
		var insertSets = [];
		var curDate = formatDate(new Date);
		var date = new Date();
		var curTime = date.getHours() - 5 + ":" + date.getMinutes() + ":" + date.getSeconds();

		for(entry in req.body) {
			if(entry.slice(0,3) === "com") {

				switch(count) {
					case 1:
						names.push(req.body[entry]);
						break;

					case 2:
						files.push(req.body[entry]);
						break;

					case 3: 
						tasks.push(req.body[entry]);
						break;

					case 4: 
						logics.push(req.body[entry]);
						count = 0;
						break;	
				} 
				count++;
			}
		}

		for (var i = 0; i < names.length; i++) {
			insertSets.push(componentFunc.bind(null, { name: pgmName, comName: names[i], file: files[i], task: tasks[i], logic: logics[i], curDate: curDate, curTime: curTime }));
		}

		try {
			async.parallel(insertSets, function(err, results) {
				next();
			});
		} catch (e) {
			logger.log('error', "Name: " + e.name + ", Message: " + e.message + ", Stack: " + e.stack );
		} finally {
			next();
		}

	},

	processUpdate: function(req, res, next) {
		var name = req.body.pgmName;

		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT COUNT(*) as FOUND FROM JOELIB.SYSDOCPP WHERE SPPGM='" + name + "'", function(check) {
			if(check !== undefined && check.length != 0) {
				if(check[0].FOUND == 1) {
					var type 		= req.body.pgmType,
						system 		= req.body.system,
						proDateStr 	= req.body.proDate,
						reqBy		= req.body.reqBy,
						department 	= req.body.department,
						location	= req.body.location,
						reqDateStr	= req.body.reqDate,
						design		= req.body.design,
						pgmTask		= req.body.pgmTask,
						pgmDesc		= req.body.pgmDesc,
						pgmFiles	= req.body.pgmFiles;

					var funcKeys = "";

					if (req.body.funcKeys != undefined) {
						for (var i = 0; i < req.body.funcKeys.length; i++) {
							funcKeys += req.body.funcKeys[i] + ",";
						}
						funcKeys = funcKeys.slice(0, funcKeys.length - 1);
					} 

					/**** Note: when doing an update the callback function is not called... ****/
					db.init();
					db.conn("*LOCAL");
					db.exec("UPDATE JOELIB.SYSDOCPP SET SPPGM='" + name + "', SPTYPE='" + type + "', SPREQ='" + reqBy + "', " +
							 "SPDEP='" + department + "', SPSYSTEM='" + system + "', SPLOCAL='" + location + "', SPDATREQ='" +
							 reqDateStr + "', SPDATPRO='" + proDateStr + "', SPDESIGN='" + design + "', SPFUNC='" + funcKeys +
							 "', SPFILES='" + pgmFiles + "', SPDESC='" + pgmDesc + "', SPTASK='" + pgmTask + "' " +
							 "WHERE SPPGM='" + name + "' with NC", function(results) {});

					next();
				} else {
					req.error = {
						msg: "ERROR Record Not Found/Or duplicate records detected!"
					};
					next();
				}
			} else {
				req.error = {
					msg: "ERROR Unable to Check file for duplicate records"
				};
				next();
			}
		});
	},

	processUpdateReferences: function(req, res, next) {
		var name 		= req.body.pgmName,
			calledBySet	= req.body.calledBy.split(","),
			callsSet	= req.body.calls.split(",");

		for (var i = 0; i < calledBySet.length; i++) {
			calledBySet[i] = calledBySet[i].trim();
		}

		for (var i = 0; i < callsSet.length; i++) {
			callsSet[i] = callsSet[i].trim();
		}

		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT SRPGM, SRTRGT FROM JOELIB.SYSDOCRP WHERE SRPGM='" + name + "' OR SRTRGT='" + name + "'", function(results) {
			if(results !== undefined && results.length != 0) {
				var existingPairs = [];
				for(result in results) {
					existingPairs[result] = { 
						src: results[result].SRPGM.trim(),
						tgt: results[result].SRTRGT.trim()
					};
				}
				var length = existingPairs.length;
				var removals = [];
				for(var entry = 0; entry < length; entry++) {
					if (callsSet.indexOf(existingPairs[entry].tgt) > -1) {
						callsSet.splice(callsSet.indexOf(existingPairs[entry].tgt), 1);;
						removals.push(entry);
					} else if(calledBySet.indexOf(existingPairs[entry].src) > -1) {
						calledBySet.splice(calledBySet.indexOf(entry));
						removals.push(entry);
					}
				}
				
				for (var i = removals.length - 1; i >= 0; i--) {
					existingPairs.splice(i, 1);
				}

				if(existingPairs !== undefined && existingPairs.length > 0) {
					var deleteString = "DELETE FROM JOELIB.SYSDOCRP WHERE ";
					for(entry in existingPairs) {
						deleteString += "SRPGM='" + existingPairs[entry].src + "' AND SRTRGT='" + existingPairs[entry].tgt + "'";
						if(entry != existingPairs.length - 1) {
							deleteString += " OR ";
						}
					}
					deleteString += " with NC";

					db.init();
					db.conn("*LOCAL");
					db.exec(deleteString, function(results){
						var insertSets = [];
						if (callsSet[0] != "Comma separate each program name.") {
							for (var i = 0; i < callsSet.length; i++) {
								insertSets.push(referencesFunc.bind(null, { name: name, calls: callsSet[i]}));
							}
						}

						if (calledBySet[0] != "Comma separate each program name.") {
							for (var i = 0; i < calledBySet.length; i++) {
								insertSets.push(referencesFunc.bind(null, { name: calledBySet[i], calls: name}));
							}
						}

						try {
							async.parallel(insertSets, function(err, results) {
								if(err) {throw err;}
								next();
							});
						} catch (e) {
							logger.log('error', "Name: " + e.name + ", Message: " + e.message + ", Stack: " + e.stack );
						} finally {
							next();
						}
					});
				} else if(callsSet.length > 0 || calledBySet.length > 0) {
					var insertSets = [];
					if (callsSet[0] != "Comma separate each program name.") {
						for (var i = 0; i < callsSet.length; i++) {
							insertSets.push(referencesFunc.bind(null, { name: name, calls: callsSet[i]}));
						}
					}

					if (calledBySet[0] != "Comma separate each program name.") {
						for (var i = 0; i < calledBySet.length; i++) {
							insertSets.push(referencesFunc.bind(null, { name: calledBySet[i], calls: name}));
						}
					}

					try {
						async.parallel(insertSets, function(err, results) {
							if(err) {throw err;}
							next();
						});
					} catch (e) {
						logger.log('error', "Name: " + e.name + ", Message: " + e.message + ", Stack: " + e.stack );
					} finally {
						next();
					}
				} else {
					next();
				}
			}
		});
	}
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function referencesFunc(dataArgs, callback) {
	var name 	= dataArgs.name;
	var calls 	= dataArgs.calls;
	var curDate = dataArgs.curDate;
	var curTime = dataArgs.curTime;

	db.init();
	db.conn("*LOCAL", function() {
		db.autoCommit(true);
	});
	db.exec("INSERT INTO JOELIB.SYSDOCRP (SRPGM, SRTRGT) VALUES('" + name + "', '" + calls + "') with NC", function(insertResults) {
		callback(null, insertResults);
	});
}

function componentFunc(dataArgs, callback) {
	var name  	= dataArgs.name;
	var comName = dataArgs.comName;
	var file  	= dataArgs.file;
	var task  	= dataArgs.task.replace("'", " ");
	var logic 	= dataArgs.logic.replace("'", " ");
	var curDate = dataArgs.curDate;
	var curTime = dataArgs.curTime;

	var insertString = "INSERT INTO JOELIB.SYSDOCCP (SCPGM, SCCOMPNME, SCFILES, SCTASK, SCLOG, SCCDAT, SCCTIM, SCCPGM, SCCUSR) VALUES ('" + name + "', '" + comName + "', '" + file + "', '" + task + "', '" + logic + "', '" + curDate + "', '" + curTime + "', 'WEBPGM', 'WEBUSER') with NC";

	logger.log('debug', insertString);

	db.init();
	db.conn("*LOCAL", function() {
		db.autoCommit(true);
	});
	db.exec(insertString, function(insertResults) {
		callback(null, insertResults);
	});
}
