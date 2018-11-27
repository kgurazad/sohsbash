$(document).ready(function () {
	$('#new').on('click', function () {
		newQuote($('#content').val(), $('#notes').val(), $('#tags').val, function (quote) {
			alert(JSON.stringify(quote));
		});
	});
});