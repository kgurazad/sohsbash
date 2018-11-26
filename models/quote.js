const mongoose = require('mongoose');
const quoteSchema = new mongoose.Schema({
	id: Number,
	content: String,
	notes: String,
	tags: [String],
	upvotes: Number,
	downvotes: Number,
	datePosted: Date,
	verified: Boolean,
	deleted: Boolean
});
var quoteModel = mongoose.model("quote", quoteSchema);

exports.newQuote = function (content, notes, tags) {
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
			verified: /*false*/ true, // lol fix this when we make the mod portal pl0x
			deleted: false
		});
		quote.save();
	});
}

exports.upvote = function (id, takeback, cb) {
	var n = 1;
	if (takeback === true) {
		n = -1;
	}
	quoteModel.findOneAndUpdate({id: id}, {$inc: {upvotes: n}}, {new: true}, function (err, quote) {
		if (err) {
			console.error(err);
		}
		console.log(quote);
		cb(quote);
	});
}

exports.downvote = function (id, takeback, cb) {
	var n = 1;
	if (takeback === true) {
		console.log('uh oh')
		n = -1;
	}
	quoteModel.findOneAndUpdate({id: id}, {$inc: {downvotes: n}}, {new: true}, function (err, quote) {
		if (err) {
			console.error(err);
		}
		cb(quote);
	});
}

exports.setVerified = function (id, verified) {
	quoteModel.findOneAndUpdate({id: id}, {$set: {verified: verified}}, function (err, quote) {
		if (err) {
			console.error(err);
		}
	});
}

exports.setDeleted = function (id, deleted) {
	quoteModel.findOneAndUpdate({id: id}, {$set: {deleted: deleted}}, function (err, quote) {
		if (err) {
			console.error(err);
		}
	});
}

exports.search = function (query, cb) {
	quoteModel.find(query, cb); // yay design patterns
}