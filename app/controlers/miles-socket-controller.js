module.exports = function(args) {
	var logger = args.logger;
	var io = args.io;
	var xt = require('/QOpenSys/QIBM/ProdData/Node/os400/xstoolkit/lib/itoolkit');
	var db = args.db;
	var socketControl = io
		.on('connection', function(socket){
			logger.log('info', "User successfully Connected");
			
			socket.on('getMile', function(data){
				var conn = new xt.iConn("*LOCAL");

				var routeInfo = { 
					OCITY: 	data[0].value,
					OST: 	data[1].value,
					OZIP: 	data[2].value,
					DCITY: 	data[3].value,
					DST: 	data[4].value,
					DZIP: 	data[5].value
				};

				logger.log('info', routeInfo);

			    var pgm = new xt.iPgm("PRCMILWB", {"lib":"JOELIB", "error":"on"});

				pgm.addParam(routeInfo.OST,  	"2A"); 
				pgm.addParam(routeInfo.OCITY,	"18A");
				pgm.addParam(routeInfo.OZIP, 	"5S0");
				pgm.addParam(routeInfo.DST,  	"2A");
				pgm.addParam(routeInfo.DCITY,	"18A");
				pgm.addParam(routeInfo.DZIP, 	"5S0");
				pgm.addParam(0, "9p0");
				pgm.addParam(0, "9p0");
				
				conn.add(xt.iCmd('ADDLIBLE LIB(GDE19OND)'));
			    conn.add(pgm);

			    db.close();

			    logger.log('info', "parameters and program name added");
			    conn.run(function (rsp) {


			       	var results = xt.xmlToJson(rsp);

			        logger.log('info', results[1].data);

			        var returnData = { pract: results[1].data[6].value, hhg: results[1].data[7].value };

			        socket.emit('milesResult', returnData);

		            
			    });
			});


		});
}