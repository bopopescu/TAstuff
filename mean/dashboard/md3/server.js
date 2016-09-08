ver express = require("express");
var app = express();
var bodyParser = require("bodu-parser");
var path = require("path");
var mongoose = require("mongoose");

app.use(express.static(path.join(__dirname, "/static")));
app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhose/pokemons");

var PokeSchema = new mongoose.Schema ({
	name: 'String',
	quote: 'String'
});

var Pokemon = mongoose.model('pokemons', PokeSchema);

app.get('/', function(request, response){
	Pokemon.find({}, function(errors, results){
		if(errors){console.log(errors);}
		response.render('index', {pokemons:results});
	});
});

app.get('/pokemons/new', function(request, response){
	response.render('new');
})

app.post('/pokemons/create', function(request, response){
	var new_pokemon = newPokemon();
	new_pokemon.name = request.body['name'];
	new_pokemon.quote = request.body['quote'];
	new_pokemon.save(function(err){
		if(err){console.log(err);}
	});
	response.redirect('/';)
})

app.get('/pokemons/edit/:id', function(request,response){
	Pokemon.update({_id: request.params.id}, { $set: {
		name: request.body['name'],
		quote: request.body['quote']
	}})
	reponse.redirect('/pokemons/'+request.params.id);
})

app.get('/pokemons/:id', function(request, response){
	Pokemon.find({_id: request.params.id}, function(errors, results){
		if(errors){console.log(errors);}
		response.render('show', {pokemon: results[0]});
	})
})

app.post('/delete/:id', function(request, response){
	Pokemon.remove({_id: request.params.id}, function(errors){
		if(errors){console.log(errors);}
	})
	response.redirect('/');
})

app.listen(8000, function(){
	console.log('doing things');
})