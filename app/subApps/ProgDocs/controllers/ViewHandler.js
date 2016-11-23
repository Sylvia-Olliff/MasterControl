var db = require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');
var logger = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/logger.js') : require('/www/master_control/logger.js'));


module.exports = {
	viewMain: function(req, res, next) {
		var pgmName = req.body.pgmName;

		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT SPPGM, SPTYPE, SPREQ, SPLOCAL, SPDEP, SPSYSTEM, SPDATREQ, SPDATPRO, SPDESIGN, SPFUNC, SPFILES, SPDESC, SPTASK" +
		 		" FROM JOELIB.SYSDOCPP WHERE SPPGM='" + pgmName + "'", function(results) {

		 	if (results !== undefined && results.length != 0) {
		 		req.pgmData = {
		 			name: 		results[0].SPPGM.trim(),
		 			type: 		results[0].SPTYPE.trim(),
		 			system: 	results[0].SPSYSTEM.trim(),
		 			proDate: 	results[0].SPDATPRO.trim(),
		 			reqBy: 		results[0].SPREQ.trim(),
		 			department: results[0].SPDEP.trim(),
		 			location: 	results[0].SPLOCAL.trim(),
		 			reqDate: 	results[0].SPDATREQ.trim(),
		 			design: 	results[0].SPDESIGN.trim(),
		 			calledBy: 	req.calledBy,
		 			calls: 		req.calls,
		 			funcKeys: 	results[0].SPFUNC.trim().split(','),
		 			pgmTask: 	results[0].SPTASK.trim(),
		 			pgmDesc: 	results[0].SPDESC.trim(),
		 			pgmFiles: 	results[0].SPFILES.trim()
		 		};
		 	}

		 	next();

		 });		
	},

	viewCallsRef: function(req, res, next) {
		var pgmName = req.body.pgmName;

		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT SRTRGT FROM JOELIB.SYSDOCRP WHERE SRPGM='" + pgmName + "'", function(results) {
			if (results !== undefined && results.length != 0) {
				var calledPgms = [];
				var count = 0;
				for(result in results) {
					calledPgms[count] = results[result].SRTRGT;
					count++;
				}

				req.calls = calledPgms;
				next();
			} else {
				//error handling here 
				req.calls = "";
				next();
			}
		});
	},

	viewCalledRef: function(req, res, next) {
		var pgmName = req.body.pgmName;

		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT SRPGM FROM JOELIB.SYSDOCRP WHERE SRTRGT='" + pgmName + "'", function(results) {
			if (results !== undefined && results.length != 0) {
				var callingPgms = [];
				var count = 0;
				for(result in results) {
					callingPgms[count] = results[result].SRPGM;
					count++;
				}

				req.calledBy = callingPgms;
				next();
			} else {
				//no results found
				req.calledBy = "";
				next();
			}
		});
		
	}
}