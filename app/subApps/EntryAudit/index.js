module.exports = function(args) {
	var express = args.express;
	var logger = args.logger;
	var methodOverride = args.methodOverride;
	var router = express.Router();
	var finder = require(__dirname + '/controllers/finder.js');


	router.use('/css', express.static(__dirname + '/views/css/'));
	router.use('/js', express.static(__dirname +  '/views/js/'));
	router.use('/res', express.static(__dirname + '/views/resources/'));
	router.use('/dist', express.static(__dirname + '/views/dist/'));
	router.use('/models', express.static(__dirname + '/models/'));
	router.use(methodOverride());

	router.get('/', function(req, res) {
		logger.log('info', "received Index request");
		
		res.render(__dirname + '/views/index.ejs', {ENV: process.env.NODE_ENV}, function(err, html){
			if (err) {logger.log('error', err);}

			res.send(html);
		});
	});

	router.post('/viewAll', finder.viewAllFile, finder.viewAllInvoice, finder.viewAllLine, finder.viewAllPGA, function(req, res) {
		logger.log('info', "Receieved ViewAll request");

		var viewAll = req.viewAll;

		if (process.env.DEBUG) {
			logger.log('debug', "viewAll request contents", viewAll);
		}

		if (req.viewAll.fileLevel.error !== undefined) {
			res.send("FILE NOT FOUND");
		} else {
			res.render(__dirname + '/views/snippets/view-all', { viewAll: viewAll}, function(err, html){
				if (err) {logger.log('error', err);}
				res.send(html);
			});
		}
	});

	router.post('/viewPG', finder.viewPGData, function(req, res){

		if (process.env.DEBUG) {
			logger.log('debug', "Receieved request for PG Information on invoice: " + req.body.invoice + 
								", line: " + req.body.line + ", for file: " + req.body.file);	
		}
		logger.log('info', "Receieved request for PG Information");

		res.render(__dirname + '/views/snippets/view-pg', { viewPGD: req.viewPGD }, function(err, html){
			if (err) {logger.log('error', err);}

			res.send(html);
		});
	});

	/**************************************************************
	 * 						Drill Down Code 					  *
	 *					  Not Currently In Use					  *
	 **************************************************************/

	// router.post('/file', finder.fileLevel, function(req, res) {
	// 	var fileHeader = req.fileLevel;
		
	// 	res.render(__dirname + '/views/snippets/file-level', {
	// 		fileLevel: fileHeader,
	// 	});
	// });

	// router.post('/invoice', finder.invoiceLevelPart1, finder.invoiceLevelPart2, function(req, res){
	// 	var invoice = req.invoice;

	// 	res.render(__dirname + '/views/snippets/invoice-level', {
	// 		invoiceLevel: invoice
	// 	});
	// });

	// router.post('/invoiceDet', finder.invoiceDetail, function(req, res){
	// 	var invoiceDetail = req.invoiceDetail;

	// 	res.render(__dirname + '/views/snippets/invoice-detail', {
	// 		invDetails: invoiceDetail
	// 	});
	// });

	// router.post('/tariffPop', finder.tariffPop, function(req, res){
	// 	var tariffPop = req.tariffPop;

	// 	res.render(__dirname + '/views/snippets/tariff-level', {
	// 		tariffLevel: tariffPop
	// 	});
	// });

	// router.post('/tarDetail', finder.tariffDetail, function(req, res){
	// 	var tarDetail = req.tarDetails;

	// 	res.render(__dirname + '/views/snippets/tariff-detail', {
	// 		tarDetails: tarDetail
	// 	});
	// });

	// router.post('/pgPop', finder.pgPop, function(req, res){
	// 	var pgPop = req.pgPop;

	// 	res.send(pgPop);
	// });

	router.use(function(err, req, res, next){
		logger.log('error-log', err);
		next();
	});

	return router;

}