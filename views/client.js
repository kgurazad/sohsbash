var vote = function (action, id, takeback) {
	if (action === 'up') {
		$.post('/upvote', {id: id, takeback: takeback}, function (data, result) {
			alert(data);
		});
	} else {
		$.post('/downvote', {id: id, takeback: takeback}, function (data, result) {
			alert(data);
		});
	}
}

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
			'<span class="vote" id="up_' + quote.id + '">UP</span> <code id="indicator_' + quote.id + '">' + quote.upvotes + '/' + (quote.upvotes - quote.downvotes) + '/' + quote.downvotes +
			'</code> <span class="vote" id="down_' + quote.id + '">DOWN</span></li>';
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
	$('.vote').on('click', function () {
		var sp = $(this).attr(id).split('_');
		var action = sp[0];
		var id = Number(sp[1]);
		if ($(this).hasClass('takeback')) {
			$(this).removeClass('takeback');
			vote(action, id, true);
		} else {
			$(this).addClass('takeback');
			vote(action, id, false);
		}
	});
});