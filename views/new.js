$(document).ready(function () {
	$('#new').on('click', function () {
		new ($('#content').val(), $('#notes').val(), $('#tags').val, function (quote) {
			alert(JSON.stringify(quote));
		});
	});
});