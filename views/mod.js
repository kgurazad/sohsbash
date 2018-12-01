var search = function () {
	$.post('/search', {
			quote_id: $('#quote_id').val(),
			content: $('#content').val(),
			tags: $('#tags').val(),
			upvotes: $('#upvotes').val(),
			downvotes: $('downvotes').val(),
		}, function (data, result) {
        render(JSON.parse(data));
    });
}

var render = function (quotes) {
	var upvotes = JSON.parse(Cookies.get('upvotes') || '[]');
	var downvotes = JSON.parse(Cookies.get('downvotes') || '[]');
	$('#quotesArea').empty();
	for (var quote of quotes) {
		var d = new Date(quote.datePosted).toLocaleString();
		var html = '<div class="quote section"><nav aria-label="breadcrumb">' +
			'<ol class="breadcrumb"><li class="breadcrumb-item">#' + quote.id + '</li>' + 
			'<li class="breadcrumb-item">' + d + '</li><li class="breadcrumb-item">' +
			'<span class="vote" id="up_' + quote.id + '">UP</span> <code id="indicator_' + quote.id + '">' + quote.upvotes + '/' + (quote.upvotes - quote.downvotes) + '/' + quote.downvotes +
			'</code> <span class="vote" id="down_' + quote.id + '">DOWN</span></li>';
		for (var tag of quote.tags) {
			html += '<li class="breadcrumb-item">' + tag + '</li>';
		}
		if (quote.reported) {
			html += '<li class="breadcrumb-item"><span class="unreport" id='+quote.id+'>UNREPORT</span></li>';
		}
		if (!quote.verified) {
			html += '<li class="breadcrumb-item"><span class="verify" id='+quote.id+'>VERIFY</span></li>';
		}
		if (!quote.deleted) {
			html += '<li class="breadcrumb-item"><span class="delete" id='+quote.id+'>DELETE</span></li>';
		}
		html += '</ol></nav>';
		html += '<div class="quoteContent"><pre><code>';
		html += quote.content;
		if (quote.notes.length > 0) {
			html += '</code></pre></div><div class="quoteNotes"><p>Notes: ';
			html += quote.notes;
			html += '</p>';
		}
		html += '</div';
		$('#quotesArea').prepend(html);
		for (var upvote of upvotes) {
			$('#up_' + upvote).addClass('takeback')
		}
		for (var downvote of downvotes) {
			$('#down_' + downvote).addClass('takeback');
		}
	}
}
$(document).ready(function () {
	search();
	$('#searchButton').on('click', function () {
		search();
	});
	$('body').on('click', 'span.vote', function () {
		var sp = $(this).attr('id').split('_');
		var action = sp[0];
		var id = Number(sp[1]);
		vote(action, id, $(this).hasClass('takeback'));
	});
	$('body').on('click', 'span.unreport', function () {
		$.post('/report', {id: Number($(this).attr('id')), reported: false}, function (data, result) {
			alert('yay');
		});
	});
	$('body').on('click', 'span.verify', function () {
		$.post('/verify', {id: Number($(this).attr('id')), verified: true}, function (data, result) {
			alert('yay');
		});
	});
	$('body').on('click', 'span.delete', function () {
		$.post('/delete', {id: Number($(this).attr('id')), deleted: true}, function (data, result) {
			alert('yay');
		});
	});
});