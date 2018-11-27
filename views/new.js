$(document).ready(function () {
	$('#new').on('click', function () {
		alert($('textarea#content').val());
		alert($('input#notes').val());
		alert($('input#tags').val());
		$.post('/new', {
				qc: $('textarea#content').val(),
				qn: $('input#notes').val(),
				qt: $('input#tags').val()
			}, function (quote, result) {
			alert(JSON.stringify(quote));
		});
	});
});