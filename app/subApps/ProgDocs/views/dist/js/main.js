$(document).ready(function() {

	$('[data-toggle="tooltip"]').tooltip();
	$.material.init();

	var componentID = 0;
	var componentCount = 0;

	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};


	$(":button").ripples();

	var loadDialog = new BootstrapDialog({
		title 	 : '',
		cssClass : 'loading-dialog',
		message  : "<div class='text-center'><img src='img/ajax-loader.gif' width='120px' height='120px' /></div>"
	});

	var errorDialog = new BootstrapDialog({
		title 	: "<h3 class='text-danger'>Error</h3>",
		type 	: BootstrapDialog.TYPE_WARNING,
		message	: ''
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

	$("#reqDate").datepicker({
		numberOfMonths: 1,
		dateFormat: 'yymmdd',
		changeMonth: true,
		changeYear: true
	}).datepicker("setDate", new Date());

	$("#proDate").datepicker({
		numberOfMonths: 1,
		dateFormat: 'yymmdd',
		changeMonth: true,
		changeYear: true
	}).datepicker("setDate", new Date());

	$("#pgmName").focus();


	/* 	Adds new Components, numbering them and adding the ability to individually remove ones that have been added.  
		Also tracks the total number of components that currently exist. This is used to loop through the Components when
		the user is ready to send the program documentation to the database.	
	*/

	$("#addComponent").on('click', function(evt){
		evt.preventDefault();

		$.ajax({
			type: "GET",
			dataType: "HTML",
			url: "addComponent",
			cache: false,
			success: function(result) {
				componentID++;
				componentCount++;
				var newComponent = "<div id='" + componentID + "'>" + result + "</div>";
				$("#content").append(newComponent);

				var tempID;
				var tempName;

				tempID = $("#removeComponent").attr('ID');
				$("#removeComponent").attr('ID', tempID + componentID);

				tempID   = $("#comName").attr('ID');
				tempName = $("#comName").attr('NAME');
				$("#comName").attr('ID', tempID + componentID)
							 .attr('NAME', tempName + componentID);

				tempID   = $("#comCalledBy").attr('ID');
				tempName = $("#comCalledBy").attr('NAME');
				$("#comCalledBy").attr('ID', tempID + componentID)
							     .attr('NAME', tempName + componentID);

				tempID   = $("#comAssFiles").attr('ID');
				tempName = $("#comAssFiles").attr('NAME');
				$("#comAssFiles").attr('ID', tempID + componentID)
							     .attr('NAME', tempName + componentID);

				tempID   = $("#comTask").attr('ID');
				tempName = $("#comTask").attr('NAME');
				$("#comTask").attr('ID', tempID + componentID)
							 .attr('NAME', tempName + componentID);

				tempID   = $("#comLogic").attr('ID');
				tempName = $("#comLogic").attr('NAME');
				$("#comLogic").attr('ID', tempID + componentID)
							  .attr('NAME', tempName + componentID);


				$("#removeComponent" + componentID).on('click', function(evt){	
					evt.preventDefault();
					$(this).parent().parent().parent().parent().parent().remove();
					componentCount--;
				});

				$("#comCalledBy" + componentID)
				  .focus(function() {
				        if (this.value === this.defaultValue) {
				            this.value = '';
				        }
				  })
				  .blur(function() {
				        if (this.value === '') {
				            this.value = this.defaultValue;
				        }
				});

				$("#comAssFiles" + componentID)
				  .focus(function() {
				        if (this.value === this.defaultValue) {
				            this.value = '';
				        }
				  })
				  .blur(function() {
				        if (this.value === '') {
				            this.value = this.defaultValue;
				        }
				});

			},
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}
		});		
	});


	$("#calledBy")
	  .focus(function() {
	        if (this.value === this.defaultValue) {
	            this.value = '';
	        }
	  })
	  .blur(function() {
	        if (this.value === '') {
	            this.value = this.defaultValue;
	        }
	});

	$("#calls")
	  .focus(function() {
	        if (this.value === this.defaultValue) {
	            this.value = '';
	        }
	  })
	  .blur(function() {
	        if (this.value === '') {
	            this.value = this.defaultValue;
	        }
	});


	/**** Listener for formatting and then submitting new Program Documentation ****/
	$("#submit").on('click', function(evt) {
		evt.preventDefault();

		var data = $("#pgmDoc").serializeObject();

		$.ajax({
			type: "POST",
			dataType: "HTML",
			data: data,
			url: "submitProgData",
			cache: false,
			success: function(result) {
				var container = document.querySelector('#submissionResponse');

				var data = {
				  message: result,
				  actionHandler: function(event) {},
				  actionText: 'Undo',
				  timeout: 3000
				};

				container.MaterialSnackbar.showSnackbar(data);
				
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}

		});

	});
});