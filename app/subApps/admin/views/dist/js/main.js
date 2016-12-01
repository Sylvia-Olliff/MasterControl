$(document).ready(function() {
	var env = $("#ENV").html();
	console.log(env);
	var apiAddress = (env == "DEV") ? "http://as400.rogers-brown.com:8888" : "http://as400.rogers-brown.com:88";

	$.fn.scrollView = function () {
	  return this.each(function () {
	    $('html, body').animate({
	      scrollTop: $(this).offset().top - 75
	    }, 1000);
	  });
	}
	$(":button").ripples();

	var loadDialog = new BootstrapDialog({
		title : '',
		cssClass : 'loading-dialog',
		message : "<div class='text-center'><img src='dist/img/ajax-loader.gif' width='120px' height='120px' /></div>"
	});

	var errorDialog = new BootstrapDialog({
		title : "<h3 class='text-danger'>Error</h3>",
		type : BootstrapDialog.TYPE_WARNING,
		message: ''
	});

	loadDialog.realize();
	loadDialog.getModalHeader().hide();
	loadDialog.getModalFooter().hide();
	loadDialog.getModalBody().css('background-color', '#579BFB');

	$(document)
		.ajaxStart(function() {
			loadDialog.open();
		})
		.ajaxStop(function() {
			loadDialog.close();
		});

	$("#clearInfo").on('click', function(evt) {
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: apiAddress + "/api/clearInfo",
			cache: false,
			success: function(result) {
				console.log(result);
				
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}

		});
	});

	$("#clearDebug").on('click', function(evt) {
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: apiAddress + "/api/clearDebug",
			cache: false,
			success: function(result) {
				console.log(result);
				
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}

		});
	});

	$("#clearErrors").on('click', function(evt) {
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: apiAddress + "/api/clearErrors",
			cache: false,
			success: function(result) {
				console.log(result);
				
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}

		});
	});

	$("#clearAll").on('click', function(evt) {
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: apiAddress + "/api/clearAll",
			cache: false,
			success: function(result) {
				console.log(result);
				
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}

		});
	});
	
	$("#restartAll").on('click', function(evt) {
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: apiAddress + "/api/restartAll",
			cache: false,
			success: function(result) {
				alert(result);
				
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}

		});
	});

	$("#logsDebug").on('click', function(evt) {
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: apiAddress + "/api/readDebug",
			cache: false,
			success: function(result) {
				
				$("#logTestView").html(result);	
				$('[data-toggle="popover"]').popover();						
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}
		});
	});

	$("#logsInfo").on('click', function(evt) {
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: apiAddress + "/api/readInfo",
			cache: false,
			success: function(result) {
				
				$("#logTestView").html(result);	
				$('[data-toggle="popover"]').popover();						
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}
		});
	});

	$("#logsError").on('click', function(evt) {
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: apiAddress + "/api/readError",
			cache: false,
			success: function(result) {
				
				$("#logTestView").html(result);	
				$('[data-toggle="popover"]').popover();						
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}
		});
	});

});