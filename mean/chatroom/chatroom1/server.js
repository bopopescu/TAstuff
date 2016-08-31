var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

app.use(express.static(path.join(__dirname,'/static')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(session({secret: 'secretestofkeys'}));

app.get('/', function(request, response){
	response.render('chatroom');
})

var server = app.listen(8000,function(){
	console.log('doin things on 8k');
});

var io = require('socket.io').listen(server);

// to keep track of users
var users = [];
// to keep track of all messages in chatroom
var messages = [];
io.sockets.on('connection', function(socket){
	console.log('we socketing!!!!'+socket);
	

	// somebody joins...
	socket.on("peep_joined", function(data){
			// add user to our user array
			users.push(data.user);
			// we need to load messages for them
			socket.emit("all_messages",{messages: messages, curr_user: data.user});
			console.log(messages);
			socket.broadcast.emit("somebody_joined", {user: data.user});
			
		})
	// somebody messages
	socket.on("peep_sent_message", function(data){
			// add message to all messages for future use
			console.log(data);
			messages.push({name: data.user, message: data.message});
			// emit that sucker to all the peeps
			io.emit("somebody_messaged", {user: data.user, new_message: data.message})
		})
	// somebody leaves
	// socket.on("disconnect", function(){

	// 	})

});