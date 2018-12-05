var mongoose = require('mongoose');
var modSchema = new mongoose.Schema({
	username: String,
	password: String // assigned to them, not chosen
});
var modModel = mongoose.model('mod', modSchema);

exports.auth = function (username, password, cb) {
	modModel.find({username: username, password: password}, function (err, mod) {
		try {
			if (err) {
				console.error(err + ' ono!');
				return;
			}
			console.log(typeof mod);
			if (mod.keys()) {
				cb(true);
			} else {
				cb(false);
			}
		} catch (e) {
			cb(false);
		}
	});
}