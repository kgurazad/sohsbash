$(document).ready(function () {
	$('#new').on('click', function () {
		newQuote($('textarea#content').val(),
			$('input#notes').val(),
			$('input#tags').val,
			function (quote) {
			alert(JSON.stringify(quote));
		});
	});
});