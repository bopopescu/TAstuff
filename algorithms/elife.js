
// plan outlines what a world willlook like
// # is terrain, o is a critter
var plan = ["############################",
			"#                          #",
			"#                     o    #",
			"#                          #",
			"#         ##       ##      #",
			"#         ##       ##      #",
			"#                          #",
			"#     o                    #",
			"#                          #",																					
			"############################"]

// these functions help represent space
function Vector(x, y){
	this.x = x;
	this.y = y;
}

// for adding vectors
Vector.prototype.plus = function(other){
	return new Vector(this.x + other.x, this.y + other.y);
};

// to represent space using a single array(witha a base^width map)
// to define an actual array using grid, 
function Grid(width, height){
	this.space = new Array(width * height);
	this.width = width;
	this.height = height;
}
Grid.prototype.isInside = function(Vector){
	return  vector.x >= 0 && vector.x < this.width &&
			vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector){
	return this.space[vector.x + this.width*vector.y];
};
Grid.prototype.set = function(vector, value){
	this.space[vector.x + this.width*vector.y] = value;
};

// some critter work

// let them see their surroundings, ye?
var directions = {
	"n": 	new Vector( 0,-1),
	"ne": 	new Vector( 1,-1),
	"e": 	new Vector( 1, 0),
	"se": 	new Vector( 1, 1),
	"s": 	new Vector( 0, 1),
	"sw": 	new Vector(-1, 1),
	"w": 	new Vector(-1, 0),
	"nw": 	new Vector(-1,-1),
};

// the following helps make a random critter that plods along 
// and then bounces off in a random direction

// finds a place to start lookiing
function randomElement(array){
	return array[Math.floor(Math.random()*array.length)];
}
// lets it understand the directions
var directionNames = "n ne e se s sw w nw".split(" ");

// bouncing critter onlyknows what direction is looking
function BouncingCritter(){
	this.direction = randomElement(directionNames);
}

// action it has is to move or bounce
BouncingCritter.prototype.act = function(view){
	if (view.look(this.direction) != " "){
		this.direction = view.find(" ") || "s";
	}
	return {type: "move", direction: this.direction};
};


// some world work
// this lets us read the plan, or map as it is
function elementFromChar(legend, ch){
	if (ch == " "){return null;}
	var element = new legend[ch]();
	element.originChar = ch;
	return element;
}

function charFromElement(element){
	if (element == null){ return " ";}
	else { return element.originChar;}
}

// creates our world array, using a map and its 
// array elements to determine width and height
function World(map, legend){
	var grid = new Grid(map[0].length, map.length);
	this.grid = grid;
	this.legend = legend;

	map.forEach(function(line, y){
		for (var x = 0; x < line.length; x++){
			grid.set(new Vector(x,y),
				elementFromChar(legend, line[x]));
		}
	});
}

// 2 dimensional loopage that takes world and makes it a string
World.prototype.toString = function(){
	var output = "";
	for (var y = 0; y < this.grid.height; y++){
		for (var x = 0; x <this.grid.width; X++){
			var element = this.grid.get(new Vector(x,y));
			output += charFromElement(element);
		}
		output += "\n";
	}
	return output;
};

// walls dont have any actions, they jsuttake up space
function Wall(){}

var world = new World(plan, { 	"#": Wall,
								"o": BouncingCritter});

