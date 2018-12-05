var mongoose = require('mongoose');
var modSchema = new mongoose.Schema({
	username: String,
	password: String // assigned to them, not chosen
});
var modModel = mongoose.model('mod', modSchema);

exports.auth = function (username, password, cb) {
	if (!username || !password) {
		cb(false);
	}
	modModel.count({username: username, password: password}, function (err, count) {
		if (count === 0) {
			cb(false);
			return;
		}
		cb(true);
	});
}