var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var session = require('express-session');

app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));
app.use(session({secret: 'secretestofkeys'}));

app.get('/', function(request, response){
	response.render('chatroom');
})

var server = app.listen(8000, function(){
	console.log('doin stuff');
})

var io = require('socket.io').listen(server);

var users = [];

var messages = [];
io.sockets.on('connection', function(socket){
	socket.on('user_joined', function(data){
		socket.emit('all_messages',{messages: messages, curr_user:data.user});
		socket.broadcast.emit('a_user_joined', {user: data.user});
	})
	socket.on('user_sent_message', function(data){
		messages.push({name: data.user, new_message: data.message});
		io.emit('a_user_messaged', {user: data.user, new_message: data.message});
	})
})