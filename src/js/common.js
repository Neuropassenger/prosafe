$(document).ready(function(){
	var steps = $('.header-form').children();

	$('a.form-step-next').click(function() {
		$(steps[0]).hide();
		$(steps[1]).fadeIn(700);
	});

	$('a.form-step-back').click(function() {
		$(steps[1]).hide();
		$(steps[0]).fadeIn(700);
	});

	$('a.form-submit').click(function() {
		$(steps[1]).hide();
		$(steps[2]).fadeIn(700);

		var order = $('.header-form').serialize();

		$.ajax({
			type: 'POST',
			url: 'order.php',
			data: order,
			success: function(data) {
				console.log('Success!');
			},
			error:  function(xhr) {
				console.log('Error: ' + xhr.responseCode);
			}
		});
	});
});