$(document).ready(function() {

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

	$('#fileNum').focus();

	$(document)
		.ajaxStart(function() {
			loadDialog.open();
		})
		.ajaxStop(function() {
			loadDialog.close();
		});

	$(".pane").hide();
	$("#content").hide();

	$("#office").on('change', function(){
		$("#fileNum").val("");
	});

	$("#fileNum").keydown(function (evt){
		if(evt.keyCode == 13) {
			var sendData = {broker: $("#office option:selected").val(),
							file: $("#fileNum").val()};
			ViewAll(sendData);
		}
	});

	$("#all").on('click', function(){
		var sendData = {broker: $("#office option:selected").val(),
						file: $("#fileNum").val()};

		ViewAll(sendData);
	});

	$("#searchGo").on('click', function(){
		var invoice = $("#scrollInv").val();
		var line = $("#scrollLin").val();

		console.log(line);

		if (line !== "") {
			$("#" + line + "." + invoice).scrollView();
		} else {
			$("#" + invoice).scrollView();
		}
	});

	function ViewAll(sendData) {
		$.ajax({
			type: "POST",
			dataType: "HTML",
			url: "viewAll",
			data: sendData,
			cache: false,
			success: function(result) {
				if (result == "FILE NOT FOUND") {
					errorDialog.setMessage("<h4 class='text-center'>File not Found! Have you Non-ABI'ed it yet?</h4>");
					errorDialog.open();
				} else {
					$("#viewAll").html(result);
					$("#fileTab").hide();
					$("#invoiceTab").hide();
					$("#viewAll").show();
					$("#content").show();
				}
			},
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}
		});		
	}

	/**************************************************************
	 * 						Drill Down Code 					  *
	 *					  Not Currently In Use					  *
	 **************************************************************/


	// $("#fileTab").on('click', function(evt) {
	// 	evt.preventDefault();
	// 	$(".tab").removeClass('active');
	// 	$("#fileTab").addClass('active');
	// 	$(".pane").hide();
	// 	$("#filePane").show();
	// });

	// $("#find").on('click', function(){
	// 	start();
	// });

	// $("#invoiceTab").on('click', function(evt){
	// 	var sendData = {broker: $("#office option:selected").val(),
	// 					file: $("#fileNum").val()};
	// 	evt.preventDefault();
	// 	InvoiceLevel(sendData);
	// });

	// function start() {
	// 	var sendData = {broker: $("#office option:selected").val(),
	// 					file: $("#fileNum").val()};

	// 	$(".pane").hide();
	// 	$("#content").hide();
	// 	$(".tab").removeClass('active');

	// 	FileLevel(sendData);
	// }


	// function FileLevel(sendData) {
	// 	$.ajax({
	// 		type: "POST",
	// 		dataType: "HTML",
	// 		url: "file",
	// 		data: sendData,
	// 		cache: false,
	// 		success: function(response) {
	// 			$("#filePane").html(response);
	// 			$("#content").show();
	// 		},
	// 		error: function(jqXHR, status, err) {
	// 			if (err == "Not Found") {
	// 				errorDialog.setTitle("Not Found");
	// 				errorDialog.setMessage("<p><strong>File Number not Found!</strong></p>");
	// 				errorDialog.open();
	// 			} else {
	// 				console.log(status, err);
	// 			}
	// 		}
	// 	});
	// }

	// function InvoiceLevel(sendData) {
	// 	$.ajax({
	// 		type: "POST",
	// 		dataType: "HTML",
	// 		url: "invoice",
	// 		data: sendData,
	// 		cache: false,
	// 		success: function(result) {
	// 			$("#invoicePane").html(result);
	// 			$(".tab").removeClass('active');
	// 			$("#invoiceTab").addClass('active');
	// 			$(".pane").hide();
	// 			$("#invoicePane").show();

	// 			$(".inv").on('click', function(){
	// 				var sequence = $(this).children().attr('id').substring(3, $(this).children().attr('id').length);
	// 				var pane = "#inv" + sequence + "Pane";
	// 				if ($(pane).hasClass("detail-on")) {
	// 					$(pane).html("");
	// 					$(pane).removeClass("detail-on");
	// 				} else {
	// 					sendData["sequence"] = sequence;
	// 					$(pane).addClass("detail-on");
	// 					TariffPop(sendData);
	// 				}
	// 			});

	// 			$(".invDetail").on('click', function(){
	// 				var sequence = $(this).attr('id').substring(9, $(this).attr('id').length);
	// 				var pane = "#inv" + sequence + "Pane";
	// 				if ($(pane).hasClass("detail-on")) {
	// 					$(pane).html("");
	// 					$(pane).removeClass("detail-on");
	// 				} else {
	// 					sendData["sequence"] = sequence;
	// 					$(pane).addClass("detail-on");
	// 					InvoiceDetail(sendData);
	// 				}
	// 			});
	// 		},
	// 		error: function(jqXHR, status, err) {
	// 			console.log("Error");
	// 			console.log(status, err);
	// 		}
	// 	});
	// }

	// function InvoiceDetail(sendData) {
	// 	$.ajax({
	// 		type: "POST",
	// 		dataType: "HTML",
	// 		url: "invoiceDet",
	// 		data: sendData,
	// 		cache: false,
	// 		success: function(result) {
	// 			var pane = "#inv" + sendData.sequence + "Pane";
	// 			$(pane).html(result);
	// 			$(pane).show();
	// 		},
	// 		error: function(jqXHR, status, err) {
	// 			console.log("Error");
	// 			console.log(status, err);	
	// 		}
	// 	});
	// }

	// function TariffPop(sendData) {
	// 	$.ajax({
	// 		type: "POST",
	// 		dataType: "HTML",
	// 		url: "tariffPop",
	// 		data: sendData,
	// 		cache: false,
	// 		success: function(result) {
	// 			var pane = "#inv" + sendData.sequence + "Pane";
	// 			$(pane).html(result);
	// 			$(pane).show();

	// 			$(".tarDetail").on('click', function(evt){
	// 				evt.preventDefault();
	// 				var selector = "#" + $(this).attr('id') + "-line";
	// 				var lineItem = $(selector).text();

	// 				sendData["lineNum"] = lineItem;

	// 				var pane = "#tar" + lineItem + "Pane";
	// 				if ($(pane).hasClass("detail-on")) {
	// 					$(pane).html("");
	// 					$(pane).removeClass("detail-on");
	// 				} else {
	// 					$(pane).addClass("detail-on");
	// 					TarDetail(sendData);
	// 				}
	// 			});

	// 			$(".tar").on('click', function(evt){
	// 				evt.preventDefault();
	// 				PGPop(sendData);
	// 			});
	// 		},
	// 		error: function(jqXHR, status, err) {
	// 			console.log("Error");
	// 			console.log(status, err);	
	// 		}
	// 	});
	// }

	// function TarDetail(sendData) {
	// 	$.ajax({
	// 		type: "POST",
	// 		dataType: "HTML",
	// 		url: "tarDetail",
	// 		data: sendData,
	// 		cache: false,
	// 		success: function(result) {
	// 			var pane = "#tar" + sendData.lineNum + "Pane";
	// 			$(pane).html(result);
	// 			$(pane).show();
	// 		},
	// 		error: function(jqXHR, status, err) {
	// 			console.log("Error");
	// 			console.log(status, err);	
	// 		}
	// 	});
	// }

	// function PGPop(sendData) {
	// 	$.ajax({
	// 		type: "POST",
	// 		dataType: "HTML",
	// 		url: "pgPop",
	// 		data: sendData,
	// 		cache: false,
	// 		success: function(result) {
	// 			// var pane = "#tar" + sendData.lineNum + "Pane";
	// 			// $(pane).html(result);
	// 			// $(pane).show();
	// 		},
	// 		error: function(jqXHR, status, err) {
	// 			console.log("Error");
	// 			console.log(status, err);	
	// 		}
	// 	});	
	// }
});