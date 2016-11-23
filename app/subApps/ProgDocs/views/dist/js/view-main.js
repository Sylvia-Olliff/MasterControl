

$(document).ready(function(){
	
	$('[data-toggle="tooltip"]').tooltip();
	$.material.init();

	$("#viewArea").hide();

	$('#pgmName').keypress(function(evt){
	    var keycode = (event.keyCode ? evt.keyCode : evt.which);
	    if(keycode == '13'){
	        getData(evt);
	    }
	});

	$("#find").on('click', function(evt){
		getData(evt);
	});

	function getData(evt) {
		evt.preventDefault();

		var data = {
			pgmName: $("#pgmName").val()
		}

		$.ajax({
			type: "POST",
			dataType: "HTML",
			data: data,
			url: "findProgram",
			cache: false,
			success: function(result) {
				$("#pgmView").html(result);
				$("#viewArea").show();

				$("#updateBtn").on('click', function(evt) {
					evt.preventDefault();

					var data = $("#pgmDoc").serializeObject();

					$.ajax({
						type: "POST",
						dataType: "HTML",
						data: data,
						url: "updateProgram",
						cache: false,
						success: function(result) {
							window.componentHandler.upgradeAllRegistered();
							var container = document.querySelector('#submissionResponse');
							
							var msg = {
							  message: result,
							  actionHandler: function(event) {},
							  actionText: 'Undo',
							  timeout: 3000
							};

							container.MaterialSnackbar.showSnackbar(msg);
							
						}, 
						error: function(jqXHR, status, err) {
							console.log("Error");
							console.log(status, err);	
						}

					});	
				});
			}, 
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}

		});
	}

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

});