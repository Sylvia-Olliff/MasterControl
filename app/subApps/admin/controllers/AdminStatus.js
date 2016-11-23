var db = require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');
var logger = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/logger.js') : require('/www/master_control/logger.js'));


module.exports = {

	referencesList: function(req, res, next) {

		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT COUNT(*) as refTotal FROM JOELIB.SYSDOCRP", function(results) {
			if (results !== undefined && results.length != 0) {
				req.connections = results[0].REFTOTAL;
				next();
			} else {
				req.connections = 0;
				next();
			}
		});
	},

	programsList: function(req, res, next) {
		db.init();
		db.conn("*LOCAL");
		db.exec("SELECT COUNT(*) as pgmTotal FROM JOELIB.SYSDOCPP", function(results) {
			console.log(results);
			if (results !== undefined && results.length != 0) {
				req.programs = results[0].PGMTOTAL;
				next();
			} else {
				req.programs = 0;
				next();
			}
		});	
	}
}