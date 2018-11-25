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
		var html = '<nav aria-label="breadcrumb"><ol class="breadcrumb><li class="breadcrumb-item">Quote #' + quote.id + "</li>";
		for (var tag of quotes.tags) {
			html += '<li class="breadcrumb-item">' + tag + '</li>';
		}
		html += "</ol></div>";
		$('#quotesArea').prepend(html);
	}
}

$(document).ready(function () {
	$('#searchButton').on('click', function () {
		search();
	});
});