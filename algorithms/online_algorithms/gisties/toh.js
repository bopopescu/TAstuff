function toh(towers, last_moved){
	console.log(towers, last_moved);
	if(towers[0].length < 1 && towers[1].length < 1){
		return "woot!";
	}
	// console.log('not solved yet');
	var moved = false;
	var last_moved = last_moved || 0;
	for (var i = 0; i < towers.length; i++){
		if (moved == true){
			break;
		}
		for (var j = 0; j < towers.length; j++){
			// console.log('havent move yet');
			if (towers[i][towers[i].length] != last_moved){
				// console.log('found a piece', i , j);
				// console.log('moving piece: ', towers[i][(towers[i].length)-1]);
				// console.log('moving spot: ', towers[j][(towers[j].length)-1]);
				if (towers[i][(towers[i].length)-1] < towers[j][(towers[j].length)-1] || towers[j].length == 0){
					// console.log('made a move');
					towers[j].push(towers[i].pop());
					moved = true;
					last_moved = towers[j][(towers[j].length)-1];
					// console.log('found a piece and moved it');
					break;
				}
			}
		}
	}
	toh(towers, last_moved);
}

function toh2(array, last_moved){
	// check win
	if(towers[0].length < 1 && towers[1].length < 1){
		return "solved!";
	}
	var last_moved = last_moved || 0;
	var moved = false;
	// find a piece
	for (var i = 0; i < towers.length; i++){
		// have we moved?
		if(moved == True){ break; }
		// try to move our piece to the right
		var piece = towers[i][towers[i].length - 1];
		for(var j = i+1; j < towers.length; j++){
			// did we already move?
			if(moved == True){ break; }
			// see if we caaan move
			if(towers[j][towers[j].length - 1] < piece || towers[j].length === 0){
				// move piece
				towers[j].push(towers[i].pop());
				// we moved!
				moved = True;
				last_moved = piece;
			}
		}
		// have moved?
		if(moved == True){ break; }
		// guess we gotta look from the left now...
		for(var k = 0; k < i; k++){
			// have moved yet?
			if(moved == True){ break; }
			if(towers[k].length === 0 || towers[k][towers[k].length])
		}

	}
}

var towers = [
		[7,5,3,1],
		[],
		[]
	]

toh(towers);