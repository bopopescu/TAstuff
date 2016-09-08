var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function(request, response){
	response.render('chatroom');
})

var server = app.listen(8000, function(){
	console.log(' yo we doing the things');
});

var io = require('socket.io').listen(server);

var users = [];

var messages = [];

io.sockets.on('connection', function(socket){
	socket.on('i_joined', function(data){
		socket.emit('thank_for_joining', {messages: messages, user:data.user});
		socket.broadcast.emit('a_user_joined', {user: data.user});
	})
	socket.on('user_sent_message', function(data){
		messages.push({name: data.user, message: data.message});
		io.emit('somebody_messaged', {user: data.user, new_message: data.message});
	})
})
