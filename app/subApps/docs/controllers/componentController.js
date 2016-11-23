//Component Controller -- gathers information from the component details module 

var programs = require('/www/master_control/app/subApps/docs/models/componentDetails.js');

module.exports = {

	getDetails: function(req, res, next) {
		var comp = req.body.compName;
		var pgm  = req.body.pgm;

		var details = programs.components[pgm];
		//console.log(programs);

		req.component = {
			title: details[comp].title,
			depreciated: details[comp].depreciated,
			calledBy: details[comp].calledBy,
			files: details[comp].files,
			task: details[comp].task,
			location: details[comp].location,
			logic: details[comp].logic
		}

		next();
	}
}

