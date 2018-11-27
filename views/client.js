Array.prototype.contains = function (item) {
	return this.indexOf(item) !== -1;
}

var vote = function (action, id, takeback) {
	var upvotes = JSON.parse(Cookies.get('upvotes') || '[]');
	var downvotes = JSON.parse(Cookies.get('downvotes') || '[]');
	if ((upvotes.contains(id) && action === 'down') || (downvotes.contains(id) && action === 'up')) {
		alert('you\'ve already voted on this quote!');
		return;
	}
	if (action === 'up') {
		if (takeback === true) {
			if (!upvotes.contains(id)) {
				alert('you haven\'t upvoted this quote yet!');
				return;
			}
			upvotes.splice(upvotes.indexOf(id), 1);
			$('#up_' + id).removeClass('takeback');
		} else {
			if (upvotes.contains(id)) {
				alert('you\'ve already upvoted this quote!');
				return;
			}
			upvotes.push(id);
			$('#up_' + id).addClass('takeback');
		}
	} else {
		if (takeback === true) {
			if (!downvotes.contains(id)) {
				alert('you haven\'t downvoted this quote yet!');
				return;
			}
			downvotes.splice(downvotes.indexOf(id), 1)
			$('#down_' + id).removeClass('takeback');
		} else {
			if (downvotes.contains(id)) {
				alert('you\'ve already downvoted this quote!');
				return;
			}
			downvotes.push(id);
			$('#down_' + id).addClass('takeback');
		}
	}
	$.post('/vote', {action: action, id: id, takeback: takeback}, function (quote, result) {
		$('#indicator_'+id).html(quote.upvotes + '/' +
			(quote.upvotes - quote.downvotes) + '/' +
			quote.downvotes);
		Cookies.set('upvotes', JSON.stringify(upvotes));
		Cookies.set('downvotes', JSON.stringify(downvotes));
	});
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
	var upvotes = JSON.parse(Cookies.get('upvotes') || '[]');
	var downvotes = JSON.parse(Cookies.get('downvotes') || '[]');
	$('#quotesArea').empty();
	for (var quote of quotes) {
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
		for (var upvote of upvotes) {
			$('#up_' + upvote).addClass('takeback')
		}
		for (var downvote of downvotes) {
			$('#down_' + downvote).addClass('takeback');
		}
	}
}

var newQuote = function (content, notes, tags, cb) {
	$.post('/new', {quoteContent: content, quoteNotes: notes, quoteTags: tags}, function (data, result) {
		typeof cb === 'function' && cb(data);
	});
}