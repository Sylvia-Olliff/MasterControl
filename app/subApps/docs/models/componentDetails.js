//Details for every component represented in the documents subApp

module.exports = {
	components: {
		rateBuilder: {
			checkCODE: {
				title: "checkCODE.php",
				depreciated: true,
				calledBy: ["User Interface"],
				files: ["XL_RBNALT/BNARAPRP", "QS36F/BNACUSMP", "XL_RBNALT/BNAPROFP"],
				task: "To verify the SCAC code from the header section of the Rate Entry Interface is a valid SCAC code",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "First verify that the information sent to this component is of the type expected. Then check BNARAPRP first for SCAC code, if found return true and quit. If not found check BNACUSMP. If found return true and quit. If not found check BNAPROFP. If found return true and quit. If not found return false."
			},
			config: {
				title: "config.ini",
				depreciated: false,
				calledBy: ["settings"],
				files: ["NONE"],
				task: "Store Debug and Display indicators/flags",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "N/A"
			},
			convertArray: {
				title: "convertArray.php",
				depreciated: false,
				calledBy: ["formGenerator", " formProcessor", " fuelForm", " fuelCopy", " fuelProcessor"],
				files: ["NONE"],
				task: "Translate the double layered array submitted by the User Interface into an easy to use key - value array",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Nested foreach loops alternating between key and value. Thus the value capture the first time will be the key associated with the value capture the second time and so on."
			},
			EntryClasses: {
				title: "EntryClasses.php",
				depreciated: false,
				calledBy: ["formProcessor", " fuelProcessor"],
				files: ["NONE"],
				task: "Store a series of Data Structures to ensure data integrity before writing lane data to file",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Superclass contains every field, each subclass only implements methods to input data into fields necessary for that entry type."
			},
			error: {
				title: "error.log",
				depreciated: false,
				calledBy: ["errorLogger"],
				files: ["NONE"],
				task: "store all debugging statements and user errors generated from the RateBuilder application running.",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "N/A"
			},
			errorLogger: {
				title: "errorLogger.php",
				depreciated: false,
				calledBy: ["formGenerator", " formProcessor", " fuelForm", " fuelCopy", " fuelProcessor", " fuelWriter", " getPrecs", " writer"],
				files: ["error.log"],
				task: "write any errors that occur throughout the RateBuilder application to the error.log file",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "expect a string to be sent. append the current date and timestamp to the error and then append it to the end of the log file."
			},
			formGenerator: {
				title: "formGenerator.php",
				depreciated: false,
				calledBy: ["User Interface"],
				files: ["NONE"],
				task: "provide the HTML code for the details section of the User Interface form for a given Entry Type. i.e. If the user requests a City,ST to City,ST lane entry form. This component sends back the appropriate HTML that presents that form.",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Get the list of precedences from getPrecs.php use this and the data sent from the Header section of the User Interface to set up a switch case that sends back the appropriate HTML."
			},
			formProcessor: {
				title: "formProcessor.php",
				depreciated: false,
				calledBy: ["User Interface"],
				files: ["NONE"],
				task: "Validate and format Lane Data submitted by the User Interface appropriately for the given Precedence Type. If it is Mileage based, pass to milesProcessor",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Determine which precedence is being submitted. Based on which precedence is being submitted determine which form elements should be there and have contents. Verify that these form elements exist and have data. cycle through each full set of lane data adding each field to an Entry Object. For each full set of lane data add the compeleted Entry Object to an Array to be passed to the writer."
			},
			fuelCopy: {
				title: "fuelCopy.php",
				depreciated: false,
				calledBy: ["User Interface"],
				files: ["JOELIB/BNASFUELP"],
				task: "take all of the records for a given Fuel table and copy them to another table with a unique name. If the requested name is not unique throw an error and do not copy.",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "First check if a table with the requested name already exists, if it does exit with 'EXISTS' response. If not copy each instance of the original fuel table into a new fueltable using the given name."
			},
			fuelForm: {
				title: "fuelForm.php",
				depreciated: false,
				calledBy: ["User Interface"],
				files: ["NONE"],
				task: "return the structured form for entering fuel table data. prefill the fields if the table already exists",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Check to see if the table name currently selected matches an existing fuel table, if so update the fields with the matching data from the file. If not present an empty form, do not write to file unless the form is submitted with content"
			},
			fuelProcessor: {
				title: "fuelProcessor.php",
				depreciated: false,
				calledBy: ["User Interface"],
				files: ["NONE"],
				task: "process the submitted form data for a fuel table, validating and prepping the data to be written to the file.",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Read through each element of the form, adding data in sets to an array of entry objects which are then passed to the fuel Writer to be written to the file"
			},
			fuelWriter: {
				title: "fuelWriter.php",
				depreciated: false,
				calledBy: ["fuelProcessor"],
				files: ["JOELIB/BNASFUELP "],
				task: "Write prepped data to the fuel table file.",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "First check if the given table name exists. If it does delete it and then insert the new data set. If it does not add the new data set. This is done this way so as to not run an update request for every line."
			},
			getCustomerInfo: {
				title: "getCustomerInfo.php",
				depreciated: true,
				calledBy: ["User Interface"],
				files: ["XL_RBNALT/BNAPROFP", "QS36F/BNACUSMP"],
				task: "To get the Customer/Carrier Name and contact information if it exists.",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Check BNAPROFP first to see if the SCAC code exists in there, if it does use that data. If not then check BNACUSMP. If there use that data. If not return that the Customer/Carrier information could not be found."
			},
			getPrecs: {
				title: "getPrecs.php",
				depreciated: false,
				calledBy: ["formProcessor", " fuelProcessor"],
				files: ["JOELIB/BNAPRECP"],
				task: "Retrieve the list of precedences from BNAPRECP and their associated number values returning a usable array where the keys are the precedence names and the value is the number associated.",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Grab every value for PRTYPE and PRDESC in the file, then loop through building an associative array that is returned to the calling program."
			},
			milesProcessor: {
				title: "milesProcessor.php",
				depreciated: false,
				calledBy: ["formProcessor"],
				files: ["NONE"],
				task: "To process and format lane entry data that is mileage based, before passing it on to the writer",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Loop through each element submitted from the entry form building data sets to be added to an array of Entry Objects which is then passed to the writer to be written to the file"
			},
			settings: {
				title: "settings.php",
				depreciated: false,
				calledBy: ["formProcessor", " formGenerator", " fuelCopy", " fuelForm", " fuelProcessor", " fuelWriter", " writer"],
				files: ["config.ini"],
				task: "Load the settings and configuration flags in the config.ini file to be used throughout the application",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "parse the contents of the config.ini file then set values to a series of constants with the same name"
			},
			writer: {
				title: "writer.php",
				depreciated: false,
				calledBy: ["formProcessor", " milesProcessor"],
				files: ["JOELIB/BNARATEP"],
				task: "To build an Insert SQL statement based on the type of Entry Objects submitted to it, and then write their contents to BNARATEP",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Prod\\TruckRateBuilder\\",
				logic: "Uses a switch case built using the array from getPrecs. Match the passed in array of Entry Objects with the appropriate precedence. Build the INSERT INTO SQL statement appropriate for that precedence. Loop through each Entry Object writing each one to file."
			}
		},
		rateQuery: {
			config: {
				title: "config.ini",
				depreciated: false,
				calledBy: ["settings"],
				files: ["NONE"],
				task: "Store Debug and Display indicators/flags",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Dev\\TruckRateViewer_Dev\\",
				logic: "N/A"
			},
			convertArray: {
				title: "convertArray.php",
				depreciated: false,
				calledBy: ["genView"],
				files: ["NONE"],
				task: "Translate the double layered array submitted by the User Interface into an easy to use key - value array",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Dev\\TruckRateViewer_Dev\\",
				logic: "Nested foreach loops alternating between key and value. Thus the value capture the first time will be the key associated with the value capture the second time and so on."
			},
			error: {
				title: "error.log",
				depreciated: false,
				calledBy: ["errorLogger"],
				files: ["NONE"],
				task: "Store all debugging statements and user errors generated from the RateBuilder application running.",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Dev\\TruckRateViewer_Dev\\",
				logic: "N/A"
			},
			errorLogger: {
				title: "errorLogger.php",
				depreciated: false,
				calledBy: ["genView"],
				files: ["error.log"],
				task: "Write any errors that occur throughout the RateBuilder application to the error.log file",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Dev\\TruckRateViewer_Dev\\",
				logic: "Expect a string to be sent. append the current date and timestamp to the error and then append it to the end of the log file."
			},
			genView: {
				title: "genView.php",
				depreciated: false,
				calledBy: ["User Interface"],
				files: ["XL_RBNALT/BNACONTP", "XL_RBNALT/BNAMILEP", "XL_RBNALT/BNARAPRP", "QS36F/BNAFUELP", "JOELIB/BNASFUELP", "XL_RBNALT/BNAPROFP"],
				task: "Take some combination of origin and destination information from the user, query the database for any listed lanes that match the criteria associated with the given origin and destination information. Return a formated, easy to read, table of all of the results ordered by total price and grouped by precedence",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Dev\\TruckRateViewer_Dev\\",
				logic: "Get the list of precedences. Check if the user put in a valid effective date, if not use today's date. The list of valid origin-destination combinations is every combination of city, state and zip code with city never being without state. <hr> First build the complex SELECT clause of the SQL statement that will capture all relevent data for any given lane based on where the information is located. (Usually Customer, Carrier, or Lane level). The SELECT clause also contains calculated fields like base cost by mileage and fuel cost. Then build the seperate portions of the where clause for each type of precedence combination. Next determine what format the origin and destination information submitted by the user is in. Use that to modularly build the where clause to capture all lanes that would fit any combination of precedences supported by the information the user entered. This follows the order of the precedences only showing the first result for each carrier or customer so that there are no duplicate lanes displayed. finally loop through the results formatting them into an easy to read table that is returned to the User."
			},
			settings: {
				title: "settings.php",
				depreciated: false,
				calledBy: ["genView"],
				files: ["config.ini"],
				task: "Load the settings and configuration flags in the config.ini file to be used throughout the application",
				location: "\\www\\websmart\\htdocs\\wsphp\\RateMileQuery\\Dev\\TruckRateViewer_Dev\\",
				logic: "parse the contents of the config.ini file then set values to a series of constants with the same name"
			}
		}
	}
}