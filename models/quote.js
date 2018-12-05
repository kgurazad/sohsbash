var mongoose = require('mongoose');
var quoteSchema = new mongoose.Schema({
	id: Number,
	content: String,
	notes: String,
	tags: [String],
	upvotes: Number,
	downvotes: Number,
	datePosted: Date,
	verified: Boolean,
	deleted: Boolean,
	reported: Boolean
});
var quoteModel = mongoose.model('quote', quoteSchema);

exports.newQuote = function (content, notes, tags, cb) {
	var splitTags = tags.split(' ');
	quoteModel.count({}, function (err, count) {
		var quote = new quoteModel({
			id: count,
			content: content,
			notes: notes,
			tags: splitTags,
			upvotes: 0,
			downvotes: 0,
			datePosted: new Date(),
			reported: false,
			verified: false, // lol fix this when we make the mod portal pl0x
			deleted: false
		});
		quote.save(function (err, quote) {
			if (err) {
				console.error(err);
				return;
			}
			cb(quote);
		});
	});
}

exports.vote = function (action, id, takeback, cb) {
	var n = 1;
	if (takeback === true) {
		n = -1;
	}
	if (action === 'up') {
		quoteModel.findOneAndUpdate({id: id}, {$inc: {upvotes: n}}, {new: true}, function (err, quote) {
			if (err) {
				console.error(err);
				return;
			}
			cb(quote);
		});
	} else {
		quoteModel.findOneAndUpdate({id: id}, {$inc: {downvotes: n}}, {new: true}, function (err, quote) {
			if (err) {
				console.error(err);
				return;
			}
			cb(quote);
		});
	}
}

exports.setReported = function (id, reported) {
	quoteModel.findOneAndUpdate({id: id}, {$set: {reported: reported}}, function (err, quote) {
		if (err) {
			console.error(err);
		}
	});
}

exports.setVerified = function (id, verified) {
	quoteModel.findOneAndUpdate({id: id}, {$set: {verified: verified}}, function (err, quote) {
		if (err) {
			console.error(err);
		}
	});
}

exports.delete = function (id) {
	quoteModel.findOneAndDelete({id: id}, function (err, quote) {
		if (err) {
			console.error(err);
			return;
		}
	});
	quoteModel.updateMany({id: {$gt: id}}, {id: {$inc: -1}}, function (err, quotes) {
		if (err) {
			console.error(err);
			return;
		}
		console.log(quotes);
	});
}

exports.search = function (query, cb) {
	quoteModel.find(query, cb); // yay design patterns
}