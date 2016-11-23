$(document).ready(function(){
	$('#addNew').on('click', function(evt){
		evt.preventDefault();
		$("#display").load("http://as400.rogers-brown.com:88/docs/addNew/");
	});

	$('#setupDev').on('click', function(evt){
		evt.preventDefault();
		$("#display").load("http://as400.rogers-brown.com:88/docs/setupDev/");
	});
	
	$('#RBNALRate').on('click', function(evt){
		evt.preventDefault();
		$("#display").load("http://as400.rogers-brown.com:88/docs/rbnalRate/");
	});
});