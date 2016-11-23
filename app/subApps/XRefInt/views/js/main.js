$(document).ready(function(){
	var firstClick = true;

	var dialog = new BootstrapDialog({
		title : 'RESPONSE',
		cssClass : '',
		type: BootstrapDialog.TYPE_SUCCESS,
		message : ""
	});

	$('#pgList').on('click', function(evt){
		evt.preventDefault();
		if (firstClick) {
			$(this).text("");	
		}
	});

	$('#addSet').on('click', function(){
		var sendData = {};

		sendData = {
			agency: 	$('#ageQual').val(),
			code:   	$('#prgCode').val(),
			program: 	$('#agePgm').val(),
			pgs: 		$('#pgList').val()
		};

		addEntrySet(sendData);
	});


	function addEntrySet(sendData) {
		$.ajax({
			type: "POST",
			dataType: "HTML",
			url: "addSet",
			data: sendData,
			cache: false,
			success: function(result) {
				console.log(result);
				if (result == "SUCCESS") {
					dialog.setType(BootstrapDialog.TYPE_SUCCESS);
					dialog.setTitle("SUCCESS");
					dialog.setMessage("Entry Set added Successfully");
					dialog.open();
				} else if (result == "EXISTS") {
					dialog.setType(BootstrapDialog.TYPE_WARNING);
					dialog.setTitle("EXISTS");
					dialog.setMessage("Entry Set already exists");
					dialog.open();
				} else {
					dialog.setType(BootstrapDialog.TYPE_DANGER);
					dialog.setTitle("ERROR");
					dialog.setMessage("There was an error adding entry");
					dialog.open();
					console.log(result);
				}
			},
			error: function(jqXHR, status, err) {
				console.log("Error");
				console.log(status, err);	
			}
		});
	}
});