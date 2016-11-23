var db = require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');
var logger = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/logger.js') : require('/www/master_control/logger.js'));

module.exports = {
	PG01: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG01");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG01P'", 
			function(fieldResults){
				var searchQry = "SELECT ";
				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG01P WHERE P01FILE=" + file + " AND P01BKR=" + broker + " AND P01ICNT=" + invoice + " AND P01TCNT=" + line + " AND P01USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},

	PG02: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG02");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG02P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG02P WHERE P02FILE=" + file + " AND P02BKR=" + broker + " AND P02ICNT=" + invoice + " AND P02TCNT=" + line + " AND P02USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},	
	PG04: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG04");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG04P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG04P WHERE P04FILE=" + file + " AND P04BKR=" + broker + " AND P04ICNT=" + invoice + " AND P04TCNT=" + line + " AND P04USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG05: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG05");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG05P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG05P WHERE P05FILE=" + file + " AND P05BKR=" + broker + " AND P05ICNT=" + invoice + " AND P05TCNT=" + line + " AND P05USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG06: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG06");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG06P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG06P WHERE P06FILE=" + file + " AND P06BKR=" + broker + " AND P06ICNT=" + invoice + " AND P06TCNT=" + line + " AND P06USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG07: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG07");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG07P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG07P WHERE P07FILE=" + file + " AND P07BKR=" + broker + " AND P07ICNT=" + invoice + " AND P07TCNT=" + line + " AND P07USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG08: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG08");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG08P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG08P WHERE P08FILE=" + file + " AND P08BKR=" + broker + " AND P08ICNT=" + invoice + " AND P08TCNT=" + line + " AND P08USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG10: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG10");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG10P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG10P WHERE P10FILE=" + file + " AND P10BKR=" + broker + " AND P10ICNT=" + invoice + " AND P10TCNT=" + line + " AND P10USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG13: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG13");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG13P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG13P WHERE P13FILE=" + file + " AND P13BKR=" + broker + " AND P13ICNT=" + invoice + " AND P13TCNT=" + line + " AND P13USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG14: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG14");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG14P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG14P WHERE P14FILE=" + file + " AND P14BKR=" + broker + " AND P14ICNT=" + invoice + " AND P14TCNT=" + line + " AND P14USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG17: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG17");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG17P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG17P WHERE P17FILE=" + file + " AND P17BKR=" + broker + " AND P17ICNT=" + invoice + " AND P17TCNT=" + line + " AND P17USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG18: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG18");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG18P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG18P WHERE P18FILE=" + file + " AND P18BKR=" + broker + " AND P18ICNT=" + invoice + " AND P18TCNT=" + line + " AND P18USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG19: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG19");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG19P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG19P WHERE P19FILE=" + file + " AND P19BKR=" + broker + " AND P19ICNT=" + invoice + " AND P19TCNT=" + line + " AND P19USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG20: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG20");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG20P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG20P WHERE P20FILE=" + file + " AND P20BKR=" + broker + " AND P20ICNT=" + invoice + " AND P20TCNT=" + line + " AND P20USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG21: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG21");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG21P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG21P WHERE P21FILE=" + file + " AND P21BKR=" + broker + " AND P21ICNT=" + invoice + " AND P21TCNT=" + line + " AND P21USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG22: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG22");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG22P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG22P WHERE P22FILE=" + file + " AND P22BKR=" + broker + " AND P22ICNT=" + invoice + " AND P22TCNT=" + line + " AND P22USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG23: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG23");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG23P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG23P WHERE P23FILE=" + file + " AND P23BKR=" + broker + " AND P23ICNT=" + invoice + " AND P23TCNT=" + line + " AND P23USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG24: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG24");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG24P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG24P WHERE P24FILE=" + file + " AND P24BKR=" + broker + " AND P24ICNT=" + invoice + " AND P24TCNT=" + line + " AND P24USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG25: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG25");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG25P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG25P WHERE P25FILE=" + file + " AND P25BKR=" + broker + " AND P25ICNT=" + invoice + " AND P25TCNT=" + line + " AND P25USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG26: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG26");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG26P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG26P WHERE P26FILE=" + file + " AND P26BKR=" + broker + " AND P26ICNT=" + invoice + " AND P26TCNT=" + line + " AND P26USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG27: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG27");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG27P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG27P WHERE P27FILE=" + file + " AND P27BKR=" + broker + " AND P27ICNT=" + invoice + " AND P27TCNT=" + line + " AND P27USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG28: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG28");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG28P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG28P WHERE P28FILE=" + file + " AND P28BKR=" + broker + " AND P28ICNT=" + invoice + " AND P28TCNT=" + line + " AND P28USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG29: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG29");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG29P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG29P WHERE P29FILE=" + file + " AND P29BKR=" + broker + " AND P29ICNT=" + invoice + " AND P29TCNT=" + line + " AND P29USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG30: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG30");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG30P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG30P WHERE P30FILE=" + file + " AND P30BKR=" + broker + " AND P30ICNT=" + invoice + " AND P30TCNT=" + line + " AND P30USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG31: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG31");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG31P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG31P WHERE P31FILE=" + file + " AND P31BKR=" + broker + " AND P31ICNT=" + invoice + " AND P31TCNT=" + line + " AND P31USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG32: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG32");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG32P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG32P WHERE P32FILE=" + file + " AND P32BKR=" + broker + " AND P32ICNT=" + invoice + " AND P32TCNT=" + line + " AND P32USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG33: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG33");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG33P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG33P WHERE P33FILE=" + file + " AND P33BKR=" + broker + " AND P33ICNT=" + invoice + " AND P33TCNT=" + line + " AND P33USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG34: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG34");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG34P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG34P WHERE P34FILE=" + file + " AND P34BKR=" + broker + " AND P34ICNT=" + invoice + " AND P34TCNT=" + line + " AND P34USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG35: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG35");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG35P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG35P WHERE P35FILE=" + file + " AND P35BKR=" + broker + " AND P35ICNT=" + invoice + " AND P35TCNT=" + line + " AND P35USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG50: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG50");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG50P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG50P WHERE P50FILE=" + file + " AND P50BKR=" + broker + " AND P50ICNT=" + invoice + " AND P50TCNT=" + line + " AND P50USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG51: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG51");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG51P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG51P WHERE P51FILE=" + file + " AND P51BKR=" + broker + " AND P51ICNT=" + invoice + " AND P51TCNT=" + line + " AND P51USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG55: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG55");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG55P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG55P WHERE P55FILE=" + file + " AND P55BKR=" + broker + " AND P55ICNT=" + invoice + " AND P55TCNT=" + line + " AND P55USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	},
	PG60: function(pgArgs, callback) {
		var file = pgArgs.file;
		var broker = pgArgs.broker;
		var invoice = pgArgs.invoice;
		var line = pgArgs.line;
		var user = pgArgs.user;
		try {
			if (process.env.DEBUG) {
				logger.log('debug', "processing query for PG60");
			}

			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT RTRIM(P00DSPFLD) as FIELD, RTRIM(P00DSCFLD) as DESCRIPTION FROM JOELIB.IMPPG00P WHERE P00FILE = 'IMPPG60P'", 
			function(fieldResults){
				var searchQry = "SELECT ";

				for(fieldSet in fieldResults) {
					searchQry += fieldResults[fieldSet].FIELD + ", ";
				}

				searchQry = searchQry.slice(0, -2);

				searchQry += " FROM QS36F.IMPPG60P WHERE P60FILE=" + file + " AND P60BKR=" + broker + " AND P60ICNT=" + invoice + " AND P60TCNT=" + line + " AND P60USER='" + user + "'";

				db.init();
				db.conn("*LOCAL");
				db.exec(searchQry, function(qryResults){
					qryResults[qryResults.length] = fieldResults;
					callback(null, qryResults);
				});
			});
		} catch(e) {
			logger.log('error', e);
		}
	} 
}