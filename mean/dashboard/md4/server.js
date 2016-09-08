var express = require('express');
var app = express();
var path =require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/pokemons');

var PokeSchema = new mongoose.Schema({
	'name': String,
	'quote': String
});

var Pokemon = mongoose.model('pokemons', PokeSchema);

app.get('/', function(request, response){
	Pokemon.find({}, function(errors, results){
		if(errors){console.log(errrors);}
		response.render('index', {pokemons: results});
	})
})

app.get('/pokemons/:id', function(request, response){
	Pokemon.find({_id: request.params.id}, function(errors, results){
		if(errors){console.log(errors);}
		response.render('show', {pokemon: results});
	})
});

app.get('/pokemons/new', function(request, response){
	response.render('new');
});

app.get('/pokemon/edit/:id', function(request, response){
	Pokemon.find({_id: request.params.id}, function(errors, results){
		if(errors){console.log(errors);}
		response.render('edit',{pokemon: results});
	})
});

app.get('pokemons/delete/:id', function(request, response){
	Pokemon.remove({_id: request.params.id}, function(errors, results){
		if (errors){console.log(errors);}
		response.redirect('/');
	})
});

app.post('pokemons/create', function(request, response){
	var new_pokemon = new Pokemon();
	new_pokemon.name = request.body['name'];
	new_pokemon.quote = request.body['quote'];
	new_pokemon.save(function(err){
		if(err){console.log(err);}
	});
	response.redirect('/');
});

app.post('/pokemons/update/:id', function(request, response){
	Pokemon.update({_id: request.params.id}, {$set: {
		name: request.body['name'],
		quote: request.body['quote']
	}})
	response.redirect('/pokemons/'+request.params.id);
})

app.listen(8000, function(){
	console.log('yoooooo..... hi! :)');
})