//EntryAudit/Controllers/finder.js

var db = require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');
var logger = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/logger.js') : require('/www/master_control/logger.js'));
var async = require('async');
var PGDataStruct = ((process.env.NODE_ENV == 'DEV') ? require('/www/master_control_Dev/app/subApps/EntryAudit/models/pgDataStruct.js') : require('/www/master_control/app/subApps/EntryAudit/models/pgDataStruct.js'));

module.exports = {
	viewAllFile: function(req, res, next) {
		var broker = req.body.broker;
		var fileNum = req.body.file;

		req.viewAll = {};

		if (process.env.DEBUG) {
			logger.log('debug', "Started processing File level information...");	
		}

		try {
			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT I0ISTAT, I0TYPEE, I0LIVE, I0GOODFS, I0MID#, I0MID# as MFG_Seller, I0OISO, I0DATE, I0MIDF, " + 
					"I0EISO, I0DUEDAT, I0SEB, I0BTYPE, I0MOTN, I0ESTDOA, I0ENTNUM FROM QS36F.ABIHOL0P" +
					" WHERE I0BKR#=" + broker + " AND I0FILE=" + fileNum, 
				function(results){
					if (results !== undefined && results.length != 0) {
						req.viewAll["fileLevel"] = {
							FILE: fileNum,
							I0ISTAT: results[0].I0ISTAT,
							I0TYPEE: results[0].I0TYPEE,
							I0LIVE: results[0].I0LIVE,
							I0GOODFS: results[0].I0GOODFS,
							MFG_Seller: results[0].MFG_SELLER,
							I0OISO: results[0].I0OISO,
							I0DATE: results[0].I0DATE,
							I0MIDF: results[0].I0MIDF,
							I0EISO: results[0].I0EISO,
							I0DUEDAT: results[0].I0DUEDAT,
							I0SEB: results[0].I0SEB,
							I0BTYPE: results[0].I0BTYPE,
							I0MOTN: results[0].I0MOTN,
							I0ESTDOA: results[0].I0ESTDOA,
							I0ENTNUM: results[0].I0ENTNUM
						}
					} else {
						req.viewAll["fileLevel"] = {
							error: "File Not Found"
						}
					}

					if (process.env.DEBUG) {
						logger.log('debug', "Finished processing File level information...");	
					}

					next();
			});
		} catch(e) {
			logger.log('error', e);
			req.errors = {
				error: "VIEWALL: Error getting File Header Info"
			}
			next();
		}
	},

	viewAllInvoice: function(req, res, next) {
		var broker = req.body.broker;
		var fileNum = req.body.file;

		if (process.env.DEBUG) {
			logger.log('debug', "Started processing Invoice level information...");	
		}

		try {
			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT I2GRI35, I2ISOE, I2DC37, I2NDC37, I2CRF34, I2CNI40, I2REL01, I2COMINV, I2IGRWGT, I2BLQIH, I2GRWR, I2BLUIH " +
		   			"FROM QS36F.ABIHOL2P WHERE I2BKR#=" + broker + " AND I2FILE=" + fileNum, 
		   		function(results){
		    		if (results !== undefined && results.length != 0) {
		    			req.viewAll["invoiceDetails"] = {};
		    			var invDetails = {};
		    			for (var i = 0; i < results.length; i++) {
		    				 invDetails[i+1] =  {
		    				 	I2GRI35:  	results[i].I2GRI35,
								I2ISOE: 	results[i].I2ISOE,
								I2DC37: 	results[i].I2DC37,
								I2NDC37: 	results[i].I2NDC37,
								I2CRF34:  	results[i].I2CRF34,
								I2CNI40:  	results[i].I2CNI40,
								I2REL01: 	results[i].I2REL01,
								I2COMINV: 	results[i].I2COMINV,
								I2IGRWGT: 	results[i].I2IGRWGT,
								I2BLQIH:  	results[i].I2BLQIH,
								I2GRWR: 	results[i].I2GRI35,
								I2BLUIH: 	results[i].I2BLUIH
		    				 }
		    			}

		    			req.viewAll["invoiceDetails"] = invDetails;
		    		} else {
		    			req.viewAll["invoiceDetails"] = {
		    				error: "Invoices Not Found"
		    			}
		    		}

		    		if (process.env.DEBUG) {
		    			logger.log('debug', "Finished processing Invoice level information...");	
		    		}

		    		next();
				});
		} catch(e) {
			logger.log('error', e);
			req.errors = {
				error: "VIEWALL: Error getting Invoice Header Info"
			}
			next();
		}
	},

	viewAllLine: function(req, res, next) {
		var broker = req.body.broker;
		var fileNum = req.body.file;

		if (process.env.DEBUG) {
			logger.log('debug', "Started processing Line level information...");	
		}

		try {
			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT I3ICNT, I3TCNT, I3TSU41, I3SPIP1, I3SPIS1, I3SPIC1, I3RATE, I3TSV42, I3QTY44, I3QTY45, I3QTY46, I3OA1, I3TSUS#2 as HTS2, I3SPIP2, I3SPIS2, " + 
					"I3SPIC2, I3RATE2, I3TSVA2, I3QTY54, I3QTY55, I3QTY56, I3OA2, I3TSUS#3 as HTS3, I3SPIP3, I3SPIS3, I3SPIC3, I3RATE3, I3TSVA3, " +
					"I3QTY64, I3QTY65, I3QTY66, I3OA3, I3YIELD, I3FEEEXP, I3VISA# as VISANUM, I3CVDCS# as CVDCASE, I3CVDRAT, I3ADDCS# as ADDCASE, " +
					"I3ADDRAT, I3LINWGT, I3CHGNDC, I3CHGDC, I3CHG48, I3MID#1 as MFG, I3CO, " + 
					"(SELECT I0OISO FROM QS36F.ABIHOL0P WHERE I0BKR#="+ broker +" AND I0FILE="+ fileNum + ") as I0OISO, " +
					"(SELECT I0EISO FROM QS36F.ABIHOL0P WHERE I0BKR#="+ broker +" AND I0FILE="+ fileNum + ") as I0EISO, " +
					"I3COE, I3MIDF FROM QS36F.ABIHOL3P WHERE I3BKR#=" + broker + " AND I3FILE=" + fileNum, 
				function(results){
					req.viewAll["lineItems"] = {}; 
					var invoice = {};
					var invCount = "";
					var invoice;
					var totCount;

					if (results !== undefined && results.length != 0) {
						invCount = results[0].I3ICNT;
						for (var i = 0; i < results.length; i++) {
							req.viewAll.lineItems[i + 1] = {
								I3ICNT:   results[i].I3ICNT,
								I3TSU41:  results[i].I3TSU41,
								I3TCNT:   results[i].I3TCNT,
								I3SPIP1:  results[i].I3SPIP1,
								I3SPIS1:  results[i].I3SPIS1,
								I3SPIC1:  results[i].I3SPIC1,
								I3RATE:   results[i].I3RATE,
								I3TSV42:  results[i].I3TSV42,
								I3QTY44:  results[i].I3QTY44,
								I3QTY45:  results[i].I3QTY45,
								I3QTY46:  results[i].I3QTY46,
								I3OA1:    results[i].I3OA1,  
								HTS2: 	  results[i].HTS2, 	 
								I3SPIP2:  results[i].I3SPIP2,
								I3SPIS2:  results[i].I3SPIS2,
								I3SPIC2:  results[i].I3SPIC2,
								I3RATE2:  results[i].I3RATE2,
								I3TSVA2:  results[i].I3TSVA2,
								I3QTY54:  results[i].I3QTY54,
								I3QTY55:  results[i].I3QTY55,
								I3QTY56:  results[i].I3QTY56,
								I3OA2:    results[i].I3OA2,  
								HTS3: 	  results[i].HTS3, 	 
								I3SPIP3:  results[i].I3SPIP3,
								I3SPIS3:  results[i].I3SPIS3,
								I3SPIC3:  results[i].I3SPIC3,
								I3RATE3:  results[i].I3RATE3,
								I3TSVA3:  results[i].I3TSVA3,
								I3QTY64:  results[i].I3QTY64,
								I3QTY65:  results[i].I3QTY65,
								I3QTY66:  results[i].I3QTY66,
								I3OA3:    results[i].I3OA3,  
								I3YIELD:  results[i].I3YIELD,
								I3FEEEXP: results[i].I3FEEEXP,
								VISANUM:  results[i].VISANUM,
								CVDCASE:  results[i].CVDCASE,
								I3CVDRAT: results[i].I3CVDRAT,
								ADDCASE:  results[i].ADDCASE,
								I3ADDRAT: results[i].I3ADDRAT,
								I3LINWGT: results[i].I3LINWGT,
								I3CHGNDC: results[i].I3CHGNDC,
								I3CHGDC:  results[i].I3CHGDC, 
								I3CHG48:  results[i].I3CHG48, 
								MFG: 	  results[i].MFG,
								I3CO:     results[i].I3CO,    
								I0OISO:   results[i].I0OISO,  
								I3COE:    results[i].I3COE,  
								I0EISO:   results[i].I0EISO,  
								I3MIDF:   results[i].I3MIDF
							}
						}
					} else {
						req.viewAll.lineItems = {
		    				error: "Line Items Not Found"
		    			}
					}

					if (process.env.DEBUG) {
						logger.log('debug', "Finished processing Line level information...");	
					}
					next();
   				});
		} catch(e) {
			logger.log('error', e);
			req.errors = {
				error: "VIEWALL: Error getting Line Item Info"
			}
			next();
		}
	},

	viewAllPGA: function(req, res, next) {
		var broker = req.body.broker;
		var fileNum = req.body.file;
		var lineItems = req.viewAll.lineItems;
		req.viewAll["PGDATA"] = {};

		if (process.env.DEBUG) {
			logger.log('debug', "Started processing PGA level information...");
		}

		try {
				
			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT P01ICNT, P01TCNT, RTRIM(P01USER) as USER FROM QS36F.IMPPG01P WHERE P01BKR=" + broker + " AND P01FILE=" + fileNum,  
			function(PG01Results) {
				if (PG01Results !== undefined && PG01Results.length != 0) {	
					var prevUsername = "";
					var currentLine = PG01Results[0].P01TCNT;
					var usernames = [];
					for (var i = 0; i < PG01Results.length; i++) {

						if (currentLine !== PG01Results[i].P01TCNT) {
							usernames = [];
							prevUsername = "";
							currentLine = PG01Results[i].P01TCNT;
						}

						if (PG01Results[i].USER !== "" && PG01Results[i].USER !== prevUsername) {
							prevUsername = PG01Results[i].USER;
							usernames.push(prevUsername);
						}

						req.viewAll.PGDATA[PG01Results[i].P01TCNT] = {
							P01TCNT: PG01Results[i].P01TCNT,
							P01USER: usernames
						}

						if (process.env.DEBUG) {
							logger.log('debug', "logging PGDATA: ");
							logger.log('debug', req.viewAll.PGDATA);
						}
					}
					next();
				} else {
					next();
				}
			});
		} catch (e) {
			logger.log('error', e);
			req.errors = {
				error: "VIEWALL: Error getting PGA Info"
			}
			next();	
		}
	},

	viewPGData: function(req, res, next) {
		var file 	= req.body.file;
		var broker 	= req.body.broker;
		var invoice = req.body.invoice;
		var line 	= req.body.line;
		var user    = req.body.user;

		if (process.env.DEBUG) {
			logger.log('debug', "viewPGData has been called, detecting PG files with data for this line");	
		}

		try {
			db.init();
			db.conn("*LOCAL");
			db.exec("SELECT " +
			    	"(SELECT COUNT(P01FILE) FROM QS36F.IMPPG01P WHERE P01BKR=" + broker +" AND P01FILE=" + file + " AND P01ICNT=" + invoice + " AND P01TCNT=" + line + " AND P01USER='') as PG01, " +
			    	"(SELECT COUNT(P02FILE) FROM QS36F.IMPPG02P WHERE P02BKR=" + broker +" AND P02FILE=" + file + " AND P02ICNT=" + invoice + " AND P02TCNT=" + line + " AND P02USER='') as PG02, " +
			    	"(SELECT COUNT(P04FILE) FROM QS36F.IMPPG04P WHERE P04BKR=" + broker +" AND P04FILE=" + file + " AND P04ICNT=" + invoice + " AND P04TCNT=" + line + " AND P04USER='') as PG04, " +
			    	"(SELECT COUNT(P05FILE) FROM QS36F.IMPPG05P WHERE P05BKR=" + broker +" AND P05FILE=" + file + " AND P05ICNT=" + invoice + " AND P05TCNT=" + line + " AND P05USER='') as PG05, " +
			    	"(SELECT COUNT(P06FILE) FROM QS36F.IMPPG06P WHERE P06BKR=" + broker +" AND P06FILE=" + file + " AND P06ICNT=" + invoice + " AND P06TCNT=" + line + " AND P06USER='') as PG06, " +
			    	"(SELECT COUNT(P07FILE) FROM QS36F.IMPPG07P WHERE P07BKR=" + broker +" AND P07FILE=" + file + " AND P07ICNT=" + invoice + " AND P07TCNT=" + line + " AND P07USER='') as PG07, " +
			    	"(SELECT COUNT(P08FILE) FROM QS36F.IMPPG08P WHERE P08BKR=" + broker +" AND P08FILE=" + file + " AND P08ICNT=" + invoice + " AND P08TCNT=" + line + " AND P08USER='') as PG08, " +
			    	"(SELECT COUNT(P10FILE) FROM QS36F.IMPPG10P WHERE P10BKR=" + broker +" AND P10FILE=" + file + " AND P10ICNT=" + invoice + " AND P10TCNT=" + line + " AND P10USER='') as PG10, " +
					"(SELECT COUNT(P13FILE) FROM QS36F.IMPPG13P WHERE P13BKR=" + broker +" AND P13FILE=" + file + " AND P13ICNT=" + invoice + " AND P13TCNT=" + line + " AND P13USER='') as PG13, " +
					"(SELECT COUNT(P14FILE) FROM QS36F.IMPPG14P WHERE P14BKR=" + broker +" AND P14FILE=" + file + " AND P14ICNT=" + invoice + " AND P14TCNT=" + line + " AND P14USER='') as PG14, " +
					"(SELECT COUNT(P17FILE) FROM QS36F.IMPPG17P WHERE P17BKR=" + broker +" AND P17FILE=" + file + " AND P17ICNT=" + invoice + " AND P17TCNT=" + line + " AND P17USER='') as PG17, " +
					"(SELECT COUNT(P18FILE) FROM QS36F.IMPPG18P WHERE P18BKR=" + broker +" AND P18FILE=" + file + " AND P18ICNT=" + invoice + " AND P18TCNT=" + line + " AND P18USER='') as PG18, " +
					"(SELECT COUNT(P19FILE) FROM QS36F.IMPPG19P WHERE P19BKR=" + broker +" AND P19FILE=" + file + " AND P19ICNT=" + invoice + " AND P19TCNT=" + line + " AND P19USER='') as PG19, " +
					"(SELECT COUNT(P20FILE) FROM QS36F.IMPPG20P WHERE P20BKR=" + broker +" AND P20FILE=" + file + " AND P20ICNT=" + invoice + " AND P20TCNT=" + line + " AND P20USER='') as PG20, " +
					"(SELECT COUNT(P21FILE) FROM QS36F.IMPPG21P WHERE P21BKR=" + broker +" AND P21FILE=" + file + " AND P21ICNT=" + invoice + " AND P21TCNT=" + line + " AND P21USER='') as PG21, " +
					"(SELECT COUNT(P22FILE) FROM QS36F.IMPPG22P WHERE P22BKR=" + broker +" AND P22FILE=" + file + " AND P22ICNT=" + invoice + " AND P22TCNT=" + line + " AND P22USER='') as PG22, " +
					"(SELECT COUNT(P23FILE) FROM QS36F.IMPPG23P WHERE P23BKR=" + broker +" AND P23FILE=" + file + " AND P23ICNT=" + invoice + " AND P23TCNT=" + line + " AND P23USER='') as PG23, " +
					"(SELECT COUNT(P24FILE) FROM QS36F.IMPPG24P WHERE P24BKR=" + broker +" AND P24FILE=" + file + " AND P24ICNT=" + invoice + " AND P24TCNT=" + line + " AND P24USER='') as PG24, " +
					"(SELECT COUNT(P25FILE) FROM QS36F.IMPPG25P WHERE P25BKR=" + broker +" AND P25FILE=" + file + " AND P25ICNT=" + invoice + " AND P25TCNT=" + line + " AND P25USER='') as PG25, " +
					"(SELECT COUNT(P26FILE) FROM QS36F.IMPPG26P WHERE P26BKR=" + broker +" AND P26FILE=" + file + " AND P26ICNT=" + invoice + " AND P26TCNT=" + line + " AND P26USER='') as PG26, " +
					"(SELECT COUNT(P27FILE) FROM QS36F.IMPPG27P WHERE P27BKR=" + broker +" AND P27FILE=" + file + " AND P27ICNT=" + invoice + " AND P27TCNT=" + line + " AND P27USER='') as PG27, " +
					"(SELECT COUNT(P28FILE) FROM QS36F.IMPPG28P WHERE P28BKR=" + broker +" AND P28FILE=" + file + " AND P28ICNT=" + invoice + " AND P28TCNT=" + line + " AND P28USER='') as PG28, " +
					"(SELECT COUNT(P29FILE) FROM QS36F.IMPPG29P WHERE P29BKR=" + broker +" AND P29FILE=" + file + " AND P29ICNT=" + invoice + " AND P29TCNT=" + line + " AND P29USER='') as PG29, " +
					"(SELECT COUNT(P30FILE) FROM QS36F.IMPPG30P WHERE P30BKR=" + broker +" AND P30FILE=" + file + " AND P30ICNT=" + invoice + " AND P30TCNT=" + line + " AND P30USER='') as PG30, " +
					"(SELECT COUNT(P31FILE) FROM QS36F.IMPPG31P WHERE P31BKR=" + broker +" AND P31FILE=" + file + " AND P31ICNT=" + invoice + " AND P31TCNT=" + line + " AND P31USER='') as PG31, " +
					"(SELECT COUNT(P32FILE) FROM QS36F.IMPPG32P WHERE P32BKR=" + broker +" AND P32FILE=" + file + " AND P32ICNT=" + invoice + " AND P32TCNT=" + line + " AND P32USER='') as PG32, " +
					"(SELECT COUNT(P33FILE) FROM QS36F.IMPPG33P WHERE P33BKR=" + broker +" AND P33FILE=" + file + " AND P33ICNT=" + invoice + " AND P33TCNT=" + line + " AND P33USER='') as PG33, " +
					"(SELECT COUNT(P34FILE) FROM QS36F.IMPPG34P WHERE P34BKR=" + broker +" AND P34FILE=" + file + " AND P34ICNT=" + invoice + " AND P34TCNT=" + line + " AND P34USER='') as PG34, " +
					"(SELECT COUNT(P35FILE) FROM QS36F.IMPPG35P WHERE P35BKR=" + broker +" AND P35FILE=" + file + " AND P35ICNT=" + invoice + " AND P35TCNT=" + line + " AND P35USER='') as PG35, " +
					"(SELECT COUNT(P50FILE) FROM QS36F.IMPPG50P WHERE P50BKR=" + broker +" AND P50FILE=" + file + " AND P50ICNT=" + invoice + " AND P50TCNT=" + line + " AND P50USER='') as PG50, " +
					"(SELECT COUNT(P51FILE) FROM QS36F.IMPPG51P WHERE P51BKR=" + broker +" AND P51FILE=" + file + " AND P51ICNT=" + invoice + " AND P51TCNT=" + line + " AND P51USER='') as PG51, " +
					"(SELECT COUNT(P55FILE) FROM QS36F.IMPPG55P WHERE P55BKR=" + broker +" AND P55FILE=" + file + " AND P55ICNT=" + invoice + " AND P55TCNT=" + line + " AND P55USER='') as PG55, " +
					"(SELECT COUNT(P60FILE) FROM QS36F.IMPPG60P WHERE P60BKR=" + broker +" AND P60FILE=" + file + " AND P60ICNT=" + invoice + " AND P60TCNT=" + line + " AND P60USER='') as PG60 FROM SYSIBM.SYSDUMMY1", 
			function(PGCheckResults) {
				if (PGCheckResults !== undefined && PGCheckResults != 0) {
					
					var PGS = PGCheckResults[0];
					var qryFiles = [];

					var pgArgs = {
						broker: broker,
						file: file,
						invoice: invoice,
						line: line,
						user: user
					};

					for(value in PGS) {
						if (PGS[value] > 0) {
							qryFiles.push(PGDataStruct[value].bind(null, pgArgs));
						}
					}

					if (process.env.DEBUG) {
						logger.log('debug', "Determined PG files, running functions in parallel");
					}

					async.parallel(qryFiles, function(err, results) {
						req.viewPGD = results;
						if (process.env.DEBUG) {
							logger.log('debug', "Logging PG file parallel results");
							logger.log('debug', results);
						}
						next();
					});

				} else {
					next();
				}
			});

		} catch(e) {
			logger.log('error', e);
			req.errors = {
				error: "VIEWALL: Error getting PGA Info"
			}
			next();
		}
	}

	/**************************************************************
	 * 						Drill Down Code 					  *
	 *					  Not Currently In Use					  *
	 **************************************************************/

	// fileLevel: function(req, res, next) {
	// 	var broker = req.body.broker;
	// 	var fileNum = req.body.file;

	// 	try{
	// 		db.init();
	// 		db.conn("*LOCAL");
	// 		db.exec("SELECT I0ISTAT, I0TYPEE, I0LIVE, I0GOODFS, I0MID#, I0MID# as MFG_Seller, I0OISO, I0DATE, I0MIDF, " + 
	// 				"I0EISO, I0DUEDAT, I0SEB, I0BTYPE, I0MOTN, I0ESTDOA, I0ENTNUM FROM QS36F.ABIHOL0P" +
	// 				" WHERE I0BKR#=" + broker + " AND I0FILE=" + fileNum, 
	// 				function(results){
	// 					if (results !== undefined && results.length != 0) {
	// 						req.fileLevel = {
	// 							FILE: fileNum,
	// 							I0ISTAT: results[0].I0ISTAT,
	// 							I0TYPEE: results[0].I0TYPEE,
	// 							I0LIVE: results[0].I0LIVE,
	// 							I0GOODFS: results[0].I0GOODFS,
	// 							MFG_Seller: results[0].MFG_SELLER,
	// 							I0OISO: results[0].I0OISO,
	// 							I0DATE: results[0].I0DATE,
	// 							I0MIDF: results[0].I0MIDF,
	// 							I0EISO: results[0].I0EISO,
	// 							I0DUEDAT: results[0].I0DUEDAT,
	// 							I0SEB: results[0].I0SEB,
	// 							I0BTYPE: results[0].I0BTYPE,
	// 							I0MOTN: results[0].I0MOTN,
	// 							I0ESTDOA: results[0].I0ESTDOA,
	// 							I0ENTNUM: results[0].I0ENTNUM
	// 						}
	// 					} else {
	// 						req.fileLevel = {
	// 							error: "File Not Found"
	// 						}
	// 					}
	// 					next();
	// 		});
	// 	} catch(e) { //This will become more elaborate as I encounter errors...
	// 		logger.log('error-log', e + " TEST");
	// 		req.errors = {
	// 			error: "Error getting File Header Info"
	// 		}
	// 		next();
	// 	}
	// },

	// invoiceLevelPart1: function(req, res, next) {
	// 	var broker = req.body.broker;
	// 	var fileNum = req.body.file;

	// 	try{
	// 		db.init();
	// 		db.conn("*LOCAL");
	// 		db.exec("SELECT COUNT(*) as INVOICES FROM QS36F.ABIHOL2P WHERE I2BKR#=" + broker + " AND I2FILE=" + fileNum, function(results){
	// 			req.invoice = {};

	// 			if (results !== undefined && results.length != 0) {
	// 				req.invoice["invoiceNum"] = results[0].INVOICES;
	// 			} else {
	// 				req.invoice["invoiceNum"] = 0;
	// 			}
	// 			next();
	// 		});
	// 	} catch(e) { //This will become more elaborate as I encounter errors...
	// 		logger.log('error-log', e);
	// 		req.errors = {
	// 			error: "Error getting Invoice Count"
	// 		}
	// 		next();
	// 	}
	// },

	// invoiceLevelPart2: function(req, res, next) {
	// 	var broker = req.body.broker;
	// 	var fileNum = req.body.file;

	// 	try{
	// 		db.init();
	// 		db.conn("*LOCAL");
	// 		db.exec("SELECT COUNT(*) as LineItems FROM QS36F.ABIHOL3P WHERE I3BKR#=" + broker + " AND I3FILE=" + fileNum + " GROUP BY I3ICNT", function(results){
				
	// 			if(results !== undefined && results.length != 0) {
	// 				var temp = {};
	// 				for (var i = 1; i <= results.length; i++) {
	// 					temp["inv" + i] = results[i-1].LINEITEMS;
	// 				}

	// 				req.invoice["lineItems"] = temp;
	// 			}
	// 			next();
	// 		});
	// 	} catch(e) { //This will become more elaborate as I encounter errors...
	// 		logger.log('error-log', e);
	// 		req.errors = {
	// 			error: "Error getting Line Item Count"
	// 		}
	// 		next();
	// 	}
	// },

	// invoiceDetail: function(req, res, next) {
	// 	var broker = req.body.broker;
	// 	var fileNum = req.body.file;
	// 	var sequence = req.body.sequence;

	// 	try{
	// 		db.init();
	// 		db.conn("*LOCAL");
	// 		db.exec("SELECT I2GRI35, I2ISOE, I2DC37, I2NDC37, I2CRF34, I2CNI40, I2REL01, I2COMINV, I2IGRWGT, I2BLQIH, I2GRWR, I2BLUIH " +
	// 			    "FROM QS36F.ABIHOL2P WHERE I2BKR#=" + broker + " AND I2FILE=" + fileNum + " AND I2ICNT=" + sequence, function(results){

	// 			if(results !== undefined && results.length != 0) {
	// 				req.invoiceDetail = {
	// 					I2GRI35:  	results[0].I2GRI35,
	// 					I2ISOE: 	results[0].I2ISOE,
	// 					I2DC37: 	results[0].I2DC37,
	// 					I2NDC37: 	results[0].I2NDC37,
	// 					I2CRF34:  	results[0].I2CRF34,
	// 					I2CNI40:  	results[0].I2CNI40,
	// 					I2REL01: 	results[0].I2REL01,
	// 					I2COMINV: 	results[0].I2COMINV,
	// 					I2IGRWGT: 	results[0].I2IGRWGT,
	// 					I2BLQIH:  	results[0].I2BLQIH,
	// 					I2GRWR: 	results[0].I2GRI35,
	// 					I2BLUIH: 	results[0].I2BLUIH
	// 				}
	// 			}
	// 			next();
	// 		});
	// 	} catch(e) {
	// 		logger.log('error-log', e);
	// 		req.errors = {
	// 			error: "Error getting Invoice Header Info"
	// 		}
	// 		next();
	// 	}
	// },

	// tariffPop: function(req, res, next) {
	// 	var invoiceSequence = req.body.sequence;
	// 	var broker = req.body.broker;
	// 	var fileNum = req.body.file;

	// 	try {
	// 		db.init();
	// 		db.conn("*LOCAL");
	// 		db.exec("SELECT I3TSU41 as TAR1, I3TSUS#2 as TAR2, I3TSUS#3 as TAR3, I3TCNT FROM QS36F.ABIHOL3P WHERE I3BKR#=" + broker + " AND I3FILE=" + fileNum + " AND I3ICNT=" +
	// 				invoiceSequence, function(results){

	// 			var tariffs = {};

	// 			if (results !== undefined && results.length != 0) {
	// 				for (var i = results.length - 1; i >= 0; i--) {
	// 					if (results[i].TAR1.trim() !== undefined && results[i].TAR1.trim() != "") {
	// 						tariffs["TAR" + i] = results[i].TAR1; 
	// 					} 
	// 					if (results[i].TAR2.trim() !== undefined && results[i].TAR2.trim() != "") {
	// 						tariffs["TAR" + i] += "  " + results[i].TAR2; 
	// 					} 
	// 					if (results[i].TAR3.trim() !== undefined && results[i].TAR3.trim() != "") {
	// 						tariffs["TAR" + i] += "  " + results[i].TAR3; 
	// 					} 
	// 					if (tariffs["TAR" + i] !== undefined) {
	// 						tariffs["TAR" + i + "_line"] = results[i].I3TCNT; 	
	// 					}
	// 				}
	// 				req.tariffPop = {
	// 					tars: tariffs
	// 				}
	// 			} else {
	// 				req.tariffPop = {
	// 					error: "tariffs not found!"
	// 				}
	// 			}
	// 			next();
	// 		});
	// 	} catch(e) { //This will become more elaborate as I encounter errors...
	// 		logger.log('error-log', e);
	// 		req.errors = {
	// 			error: "Error getting Tariff Numbers"
	// 		}
	// 		next();
	// 	}
	// },

	// tariffDetail: function(req, res, next) {
	// 	var invoiceSequence = req.body.sequence;
	// 	var lineItem = req.body.lineNum;
	// 	var broker = req.body.broker;
	// 	var fileNum = req.body.file;

	// 	try{
	// 		db.init();
	// 		db.conn("*LOCAL");
	// 		db.exec("SELECT I3TSU41, I3SPIP1, I3SPIS1, I3SPIC1, I3RATE, I3TSV42, I3QTY44, I3QTY45, I3QTY46, I3OA1, I3TSUS#2 as HTS2, I3SPIP2, I3SPIS2, " + 
	// 				"I3SPIC2, I3RATE2, I3TSVA2, I3QTY54, I3QTY55, I3QTY56, I3OA2, I3TSUS#3 as HTS3, I3SPIP3, I3SPIS3, I3SPIC3, I3RATE3, I3TSVA3, " +
	// 				"I3QTY64, I3QTY65, I3QTY66, I3OA3, I3YIELD, I3FEEEXP, I3VISA# as VISANUM, I3CVDCS# as CVDCASE, I3CVDRAT, I3ADDCS# as ADDCASE, " +
	// 				"I3ADDRAT, I3LINWGT, I3CHGNDC, I3CHGDC, I3CHG48, I3MID#1 as MFG, I3CO, " + 
	// 				"(SELECT I0OISO FROM QS36F.ABIHOL0P WHERE I0BKR#="+ broker +" AND I0FILE="+ fileNum + ") as I0OISO, " +
	// 				"(SELECT I0EISO FROM QS36F.ABIHOL0P WHERE I0BKR#="+ broker +" AND I0FILE="+ fileNum + ") as I0EISO, " +
	// 				"I3COE, I3MIDF " + 
	// 				"FROM QS36F.ABIHOL3P WHERE I3BKR#=" + broker + " AND I3FILE=" + fileNum + " AND I3ICNT=" + invoiceSequence + " AND I3TCNT=" + 
	// 				lineItem, function(results) {

	// 			if (results !== undefined && results.length != 0) {
	// 				req.tarDetails = {
	// 					I3TSU41:  results[0].I3TSU41,
	// 					I3SPIP1:  results[0].I3SPIP1,
	// 					I3SPIS1:  results[0].I3SPIS1,
	// 					I3SPIC1:  results[0].I3SPIC1,
	// 					I3RATE:   results[0].I3RATE,
	// 					I3TSV42:  results[0].I3TSV42,
	// 					I3QTY44:  results[0].I3QTY44,
	// 					I3QTY45:  results[0].I3QTY45,
	// 					I3QTY46:  results[0].I3QTY46,
	// 					I3OA1:    results[0].I3OA1,  
	// 					HTS2: 	  results[0].HTS2, 	 
	// 					I3SPIP2:  results[0].I3SPIP2,
	// 					I3SPIS2:  results[0].I3SPIS2,
	// 					I3SPIC2:  results[0].I3SPIC2,
	// 					I3RATE2:  results[0].I3RATE2,
	// 					I3TSVA2:  results[0].I3TSVA2,
	// 					I3QTY54:  results[0].I3QTY54,
	// 					I3QTY55:  results[0].I3QTY55,
	// 					I3QTY56:  results[0].I3QTY56,
	// 					I3OA2:    results[0].I3OA2,  
	// 					HTS3: 	  results[0].HTS3, 	 
	// 					I3SPIP3:  results[0].I3SPIP3,
	// 					I3SPIS3:  results[0].I3SPIS3,
	// 					I3SPIC3:  results[0].I3SPIC3,
	// 					I3RATE3:  results[0].I3RATE3,
	// 					I3TSVA3:  results[0].I3TSVA3,
	// 					I3QTY64:  results[0].I3QTY64,
	// 					I3QTY65:  results[0].I3QTY65,
	// 					I3QTY66:  results[0].I3QTY66,
	// 					I3OA3:    results[0].I3OA3,  
	// 					I3YIELD:  results[0].I3YIELD,
	// 					I3FEEEXP: results[0].I3FEEEXP,
	// 					VISANUM:  results[0].VISANUM,
	// 					CVDCASE:  results[0].CVDCASE,
	// 					I3CVDRAT: results[0].I3CVDRAT,
	// 					ADDCASE:  results[0].ADDCASE,
	// 					I3ADDRAT: results[0].I3ADDRAT,
	// 					I3LINWGT: results[0].I3LINWGT,
	// 					I3CHGNDC: results[0].I3CHGNDC,
	// 					I3CHGDC:  results[0].I3CHGDC, 
	// 					I3CHG48:  results[0].I3CHG48, 
	// 					MFG: 	  results[0].MFG,
	// 					I3CO:     results[0].I3CO,    
	// 					I0OISO:   results[0].I0OISO,  
	// 					I3COE:    results[0].I3COE,  
	// 					I0EISO:   results[0].I0EISO,  
	// 					I3MIDF:   results[0].I3MIDF  
	// 				}
	// 			} else {
	// 				req.tarDetails = {
	// 					error: "Line Item not found!"
	// 				}
	// 			}
	// 			next();
	// 		});
	// 	} catch(e) {
	// 		logger.log('error-log', e);
	// 		req.errors = {
	// 			error: "Error getting Line Item Info"
	// 		}
	// 		next();
	// 	}
	// },
	
	// pgPop: function(req, res, next) {
	// 	var invoiceSequence = req.body.sequence;
	// 	var lineItem = req.body.lineNum;
	// 	var broker = req.body.broker;
	// 	var fileNum = req.body.file;


	// 	db.init();
	// 	db.conn("*LOCAL");
	// 	db.exec("SELECT COLUMN_TEXT, COLUMN_NAME FROM SYSIBM.SQLCOLUMNS WHERE TABLE_SCHEM='QS36F' AND TABLE_NAME='IMPPG01P'", function(result){
			
	// 		next();
	// 	});



	// 	// try{
	// 	// 	db.init();
	// 	// 	db.conn("*LOCAL");
	// 	// 	db.exec("SELECT COUNT(*) as PGDATA FROM QS36F.IMPPG01P WHERE P01BKR = " + broker + " AND P01FILE=" + fileNum + " AND " + 
	// 	// 			"P01ICNT=" + sequence + " AND P01TCNT=" + lineItem, function(result) {

	// 	// 				if (result !== undefined && result.length > 0) {
	// 	// 					if (result[0].PGDATA > 0) {
	// 	// 						db.init();
	// 	// 						db.conn("*LOCAL");
	// 	// 						db.exec("", function(results){ //SQL query that returns either a 0 or data for every PG
	// 	// 							//Insert logic for all PG data found. 
	// 	// 						});

	// 	// 					} else {
	// 	// 						req.pgPop = {
	// 	// 							noPG: true;
	// 	// 						}
	// 	// 					}
	// 	// 				} else {
	// 	// 					req.pgPop = {
	// 	// 						error: "There was an error checking PG data";
	// 	// 					}
	// 	// 				}
	// 	// 			});
	// 	// } catch(e) {

	// 	// }
	// },
}