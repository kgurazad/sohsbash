const express = require('express');
const pug = require('pug');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
mongoose.connect(process.env.DB);

const quote = require(__dirname + '/models/quote');
const mod = require(__dirname + '/models/mod');

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});
app.get('/views/:file', function (req, res) {
	// there is a hole here for the mod portal but w/e
	res.sendFile(__dirname + '/views/' + req.params.file);
});
app.get('/new', function (req, res) {
	res.sendFile(__dirname + '/views/new.html');
});
app.get('/search', function (req, res) {
	res.sendFile(__dirname + '/views/search.html'); // change this around later
});
app.get('/mod', function (req, res) {
	mod.auth(req.query.username, req.query.password, function (auth) {
		if (auth === true) {
			res.sendFile(__dirname + '/views/mod.html');
		} else {
			res.sendStatus(401);
		}
	});
});
app.post('/search', function (req, res) {
	try {
		var queryParams = {};
		if (req.body.quote_id) {
			var quotes_split = req.body.quote_id.split(' ');
			for (var q in quotes_split) {
				quotes_split[q] = Number(quotes_split[q]);
			}
			queryParams.id = {$in: quotes_split};
		}
		if (req.body.content) {
			queryParams.content = {$regex: new RegExp(req.body.content, 'g')};
		}
		if (req.body.tags) {
			var quotes_split = req.body.tags.split(' ');
			queryParams.tags = {$in: quotes_split};
		}
		if (req.body.upvotes) {
			queryParams.upvotes = {$gte: Number(req.body.upvotes)};
		}
		if (req.body.downvotes) {
			queryParams.downvotes = {$gte: Number(req.body.downvotes)};
		}
		console.log(req.body.verified);
		console.log(typeof req.body.verified);
		if (req.body.verified) {
			queryParams.verified = req.body.verified;
		}
		console.log(queryParams.verified);
		quote.search(queryParams, function (err, quotes) {
			res.send(JSON.stringify(quotes));
		});
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
})
app.post('/new', function (req, res) {
	quote.newQuote(req.body.content, req.body.notes, req.body.tags.toLowerCase(), function (quote) {
		res.send(quote);
	});
});
app.post('/vote', function (req, res) {
	quote.vote(req.body.action, req.body.id, req.body.takeback === 'true', function (quote) {
		res.send(quote);
	});
});
app.post('/report', function (req, res) {
	quote.setReported(req.body.id, req.body.reported);
});
app.post('/verify', function (req, res) {
	mod.auth(req.body.username, req.body.password, function (auth) {
		console.log(auth + ' ' + typeof auth);
		if (auth === true) {
			quote.setVerified(req.body.id, req.body.verified);
		} else {
			res.sendStatus(401);
		}
	});
});
app.post('/delete', function (req, res) {
	mod.auth(req.body.username, req.body.password, function (auth) {
		if (auth === true) {
			quote.delete(req.body.id);
		} else {
			res.sendStatus(401);
		}
	});
});

app.listen(process.env.PORT || 2020);