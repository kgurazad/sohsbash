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
});