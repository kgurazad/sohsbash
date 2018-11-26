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
	$('#quotesArea').empty();
	for (var quote of quotes) {
		alert(quote);
		var html = '<div class="quote section card"><nav aria-label="breadcrumb">' +
			'<ol class="breadcrumb"><li class="breadcrumb-item">#' + quote.id + '</li>' + 
			'<li class="breadcrumb-item">' + quote.datePosted + '</li><li class="breadcrumb-item">' +
			'<span class="vote" id="up_' + quote.id + '">UP</span> ' + (quote.upvotes - quote.downvotes) + '/' + (quote.upvotes + quote.downvotes) +
			' <span class="vote" id="down_' + quote.id + '">DOWN</span></li>';
		for (var tag of quote.tags) {
			html += '<li class="breadcrumb-item">' + tag + '</li>';
		}
		html += '</ol></nav>';
		html += '<div class="quoteContent"><pre><code>';
		html += quote.content;
		html += '</code></pre></div><div class="quoteNotes"><p>Notes: ';
		html += quote.notes;
		html += '</p></div>';
		$('#quotesArea').prepend(html);
	}
}

$(document).ready(function () {
	search();
	$('#searchButton').on('click', function () {
		search();
	});
});