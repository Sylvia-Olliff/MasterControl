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

	$(document)
		.ajaxStart(function() {
			loadDialog.open();
		})
		.ajaxStop(function() {
			loadDialog.close();
		});

	
});