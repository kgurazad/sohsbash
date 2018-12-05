var mongoose = require('mongoose');
var modSchema = new mongoose.Schema({
	username: String,
	password: String // assigned to them, not chosen
});
var modModel = mongoose.model('mod', modSchema);

exports.auth = function (username, password, cb) {
	modModel.find({username: username, password: password}, function (err, mod) {
		if (err) {
			console.error(err + ' ono!');
			return;
		}
		console.log(mod + ' <- mod object');
		if (mod._id) {
			cb(true);
		} else {
			cb(false);
		}
	});
}