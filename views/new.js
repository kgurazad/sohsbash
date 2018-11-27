$(document).ready(function () {
	$('#new').on('click', function () {
		alert($('textarea#content').val());
		alert($('input#notes').val());
		alert($('input#tags').val());
		newQuote($('textarea#content').val(),
			$('input#notes').val(),
			$('input#tags').val,
			function (quote) {
			alert(JSON.stringify(quote));
		});
	});
});