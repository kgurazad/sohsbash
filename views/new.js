$(document).ready(function () {
	$('#new').on('click', function () {
		alert($('textarea#content').val());
		alert($('input#notes').val());
		alert($('input#tags').val());
		$.post('/new', {
				quoteContent: $('textarea#content').val(),
				quoteNotes: $('input#notes').val(),
				quoteTags: $('input#tags').val
			}, function (quote, result) {
			alert(JSON.stringify(quote));
		});
	});
});