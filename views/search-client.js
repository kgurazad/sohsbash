var search = function () {
	$.post('/search', {
			quote_id: $('#quote_id').val(),
			content: $('#content').val(),
			tags: $('#tags').val(),
			upvotes: $('#upvotes').val(),
			downvotes: $('downvotes').val()
		}, function (data, result) {
        render(JSON.parse(data));
    });
}

var render = function (quotes) {
	for (var quote of quotes) {
		alert(JSON.stringify(quote));
	}
}

$(document).ready(function () {
	$('#searchButton').on('click', function () {
		search();
	});
});