// floodfill, zibonacci with ideas being recursion

// floodfill...
// given a 2d array, a value, and a starting coordinate, replace all adjacent coordinates to the starting coordinate that have the saem value
// its like the paintcan on MS paint...

// [[0,1,2,3],   x coordinate is 'row'
//  [0,1,2,3],	y coordinate is 'index'
//  [0,1,2,3],
//  [0,1,2,3]]

// if a coordinate is represented as map[x][y],
// then above = map[x][y+1]
// left = map[x-1][y]
// right = map[x+1][y]
// below = map[x][y-1]

function floodfill(map, start, newval){
	// map is 2d array we are working on, .length = X
	// start is [x,y]
	// newval is the val we are changing to
	// so check a pixel's value, if we change it, call 'fill' on it?

	// easy reads
	var x = start[0];
	var y = start [1];
	// what we are replacing
	var base_val = map[x][y];
	// check the neighbors
	// above
	if (map[x][y] == base_val){
		floodfill(map, [map[x],map[y + 1]], newval);
	}
	// right
	if (map[x][y] == base_val){
		floodfill(map, [map[x + 1],map[y]], newval);
	}
		// below
	if (map[x][y] == base_val){
		floodfill(map, [map[x],map[y - 1]], newval);
	}
		// left
	if (map[x][y] == base_val){
		floodfill(map, [map[x - 1],map[y]], newval);
	}
	// fill current
	map[x][y] = newval;
}




// Zibonaci
// sorta like fibonacci, except rules change for odds or evens
// 0 == 1
// 1 == 1
// 2 == 2
// 2n+1 = z(n) + z(n-1) + 1
// 2n = z(n) + z(n+1) + 1
// LEVEL 1: make it happen


function zibonacci(val){
	if (val < 2){
		return 1;
	} else if(val == 2){
		return 2;
	} else if(val%2 == 1){
		var n = Math.floor(val/2);
		// console.log(n, n-1, 1);
		return zibonacci(n) + zibonacci(n-1) + 1;
	} else {
		var n = val/2;
		// console.log(n, n-1, 1);
		return zibonacci(n) + zibonacci(n+1) + 1;
	}
}


// LEVEL 2: bestZib(int) returns the closes zib number less than or equal to int
function bestZib(int){
	var best = 0;
	while(zibonacci(best) <= int){
		best++;
	}
	return ("the closest value is: ", zibonacci(best),". Which is from ",best);
}

