var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");

app.use(express.static(path.join(__dirname, "/static")));
app.use(bodyParser.urlencoded({ extended:true }));
app.set('views',path.join(__dirname, "/views"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost/pokemons");

var PokeSchema = new mongoose.Schema ({
	name: 'String',
	quote: 'String'
});

var Pokemon = mongoose.model('pokemons', PokeSchema);

// index
app.get('/', function(request, response){
	Pokemon.find({}, function(errors, results){
		if (errors){console.log(errors);}
		response.render('index', {pokemons: results});
	});
});
// new
app.get('/pokemons/new', function(request, response){
	response.render('new');
});
// create
app.post('/pokemons/create', function(request, response){
	var new_pokemon = new Pokemon();
	new_pokemon.name = request.body['name'];
	new_pokemon.quote = request.body['quote'];
	new_pokemon.save(function(err){
		if (err){console.log(err);}
	});
	console.log('u deeed eeet');
	response.redirect('/');
});
// edit
app.get('/pokemons/edit/:id', function(request, response){
	Pokemon.find({_id: request.params.id}, function(errors, results){
		if(errors){console.log(errors);}
		response.render('edit',{pokemon: results[0]});
	});
})
// update
app.post('/update/:id', function(request, response){
	Pokemon.update({_id: request.params.id}, {$set: {
		name: request.body['name'],
		quote: request.body['quote']
	}})
	response.redirect('/pokemons/'+request.params.id)
})

// show
app.get('/pokemons/:id', function(request, response){
	Pokemon.find({_id: request.params.id}, function(errors, results){
		if(errors){console.log(errors);}
		response.render('show',{pokemon: results[0]});
	});
	
})
// delete
app.post('/delete/:id', function(request, response){
	Pokemon.remove({_id: request.params.id}, function(errors){
		if(errors){console.log(errors);}
	})
	response.redirect('/');
})

app.listen(8000,function(){
	console.log('we doing stuff yo!');
});