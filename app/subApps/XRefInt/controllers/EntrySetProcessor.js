
var db = require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');
var logger = require('/www/master_control/logger.js');

module.exports = {
	process: function(req, res, next) {
		var agencyQual = req.body.agency;
		var programCode = req.body.code;
		var agencyPgm = req.body.program;
		var pgList = req.body.pgs.split(',');

		var insertString = "INSERT INTO JOELIB.ACEXREFP (XRAGCY, XRAGCODE, XRAGPROC, XRFILE, XRSUP) ";	

		for(pg in pgList) {
			insertString += " VALUES ('" + agencyQual + "', '" + programCode + "', '" + agencyPgm + "', 'IMP" + pgList[pg] + "P', '') UNION ALL ";
		}

		insertString = insertString.slice(0, -11);

		insertString += " WITH NC";

		try {
			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT COUNT(*) as EXISTS FROM JOELIB.ACEXREFP WHERE XRAGCY='" + agencyQual + "' AND XRAGCODE='" + programCode + "' AND XRAGPROC='" + agencyPgm + "'",
			function(checkResults){

				if (checkResults[0].EXISTS !== undefined && checkResults[0].EXISTS == 0) {
					try {
						logger.log('info', "Entry set does not already exist");
						db.init();
						db.conn("*LOCAL");
						db.exec(insertString, function(results){

							logger.log('info', "Entry set added to file");
							req.result = {
								msg: "SUCCESS"
							}

							next();
						});
					} catch(e) {
						logger.log('error', e);
						req.errors = {
							error: "Error inserting to file"
						}
						next();			
					}
				} else {
					req.result = {
						msg: "EXISTS"
					}
					next();
				}
			});

			
		} catch (e) {
			logger.log('error', e);
			req.errors = {
				error: "Error inserting to file"
			}
			next();
		}
	}
}