/*
var http = require('http');
var url = require('url');

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('request for ' + pathname + ' received.');

		route(pathname);

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}

	http.createServer(onRequest).listen(8888);
	console.log('server has started');
}

exports.start = start;
*/

var express = require('express');
var app = express();
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {

});

mongoose.connect('mongodb://localhost/test');

app.configure(function() {
	app.use(express.static(__dirname + '/app'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

//define model
var Message = mongoose.model('Message', {
	message : String,
	user : {
		id: Number,
		name: String
	}
});

app.listen(8080);
console.log('listening on port 8080');

/*
 Routes
 *
 */

//get message
app.get('/api/messages', function(req, res) {

	Message.find(function(err, messages) {

		if (err)
			res.send(err);

		res.json(messages);
	});
});

//create message
app.post('/api/messages', function(req, res) {

	Message.create({
		message : req.body.message,
		user : {
			id : req.body.user.id,
			name : req.body.user.name
		}
	}, function(err, message) {

		if (err)
			res.send(err);

		Message.find(function(err, messages) {
			console.log('in find');

			if (err)
				res.send(err);

			res.json(messages);
		});
	});
});

//delete message
app.delete('/api/messages/:todo_id', function(req, res) {

	Message.remove({
		_id : req.params.todo_id
	}, function(err, message) {
		if (err)
			res.send(err);

		Message.find(function(err, messages){
			if (err)
				res.send(err);

			res.json(todos);
		});
	});
});

//application
app.get('/', function(req, res) {
	res.sendfile('./app/index.html');
});