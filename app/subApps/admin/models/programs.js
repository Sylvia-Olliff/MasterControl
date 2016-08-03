//app/models/programs

module.exports = {
	directory: "/www/websmart/htdocs/wsphp/RateMileQuery/",
	list: {
		builder_Dev: {
			name: "Lane Builder",
			debug: "Dev/TruckRateBuilder_DEV/error.log",
			config: "Dev/TruckRateBuilder_DEV/config.ini",
			active: true
		},
		builder_Pro: {
			name: "Lane Builder",
			debug: "Prod/TruckRateBuilder/error.log",
			config: "Prod/TruckRateBuilder/config.ini",
			active: true
		},
		query_Dev: {
			name: "Rate Mile Query",
			debug: "Dev/TruckRateViewer_DEV/error.log",
			config: "Dev/TruckRateViewer_DEV/config.ini",
			active: true	
		},
		query_Pro: {
			name: "Rate Mile Query",
			debug: "Prod/TruckRateViewer/error.log",
			config: "Prod/TruckRateViewer/config.ini",
			active: false
		}
	}
}