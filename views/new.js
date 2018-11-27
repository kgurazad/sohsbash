$(document).ready(function () {
	$('#new').on('click', function () {
		alert($('textarea#content').val());
		alert($('input#notes').val());
		alert($('input#tags').val());
		$.post('/new', {
				content: $('textarea#content').val(),
				notes: $('input#notes').val(),
				tags: $('input#tags').val()
			}, function (quote, result) {
			alert(JSON.stringify(quote));
		});
	});
});