var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
// var session = require('express-session');


app.use(express.static(path.join(__dirname, "/static")));
app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// app.user(session({secret: 'thisisasecretkeyforsessionuse'}));
// basic_mongoose can/should be changed to the db you want to use for your project
mongoose.connect('mongodb://localhost/pokemons');

// mongoose Schem and collection setting up
var PokeSchema = new mongoose.Schema({
	name: String,
	quote: String
});

var Pokemon = mongoose.model('pokemons',PokeSchema);

// routes
// app.HTTP_VERB('URL', function(request, response){});

// index
app.get('/', function(request, response){	
	Pokemon.find({}, function(errors, results){
		console.log ('-1-');
		if (errors){console.log(errors);}
		console.log('-2-');
		response.render('index', {pokemons: results});
	});
});

// show
app.get('pokemons/:id', function(request, response){
	Pokemon.find({_id: request.params.id}, function(errors, results){
		if(errors){
			console.log(errors);
		}
		response.render('show', {pokemon: results});
	});
});

// new
app.get('pokemons/new/', function(request, response){
	response.render('new');
});

// create
app.post('/', function(request, response){
	Pokemon.create(request.body, function(errors, results){
		if(errors){
			consol.log(errors);
		}
		response.redirect('/');
	});
});

// edit
app.get('/:id/edit', function(request, response){
	Pokemon.find({_id: request.params.id}, function(errors, results){
		if(errors){
			console.log(errors);
		}
		response.render('edit',{pokemon: results});
	});
});

// update
app.post('/:id', function(request, response){
	Pokemon.update({_id: request.params.id}, request.body, function(errors, results){
		if(errors){
			console.log(errors);
		}
		response.redirect('/');
	});
});

// delete
app.get('/:id/delete', function(request, response){
	Pokemon.remove({_id: request.params.id}, function(errors, results){
		if(errors){
			console.log(errors);
		}
		response.redirect('/');
	});
});



// git it goin
app.listen(8000, function(){
	console.log("listening on port 8000");
});