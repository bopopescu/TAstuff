// Towers of Hanoi -recursive solution
// Given 3 poles, A, B, and C and 4 differntly sized disks stacked largest on bottom
// If the disks start on A, moving one at a time, without putting a disk on a smaller disk, move them to C

// So, first, we must ask ourself 2 big questions:
// 			1) How do we respresent this?
// 			2) How do we solve this?

// to address the first question: it makes sense that we should have an array of stacks. But I am going to use
// an array of arrays because I do not wish to implement a stack and wish to keep this as vanilla JS as possible

// To address the second, lets start with basic recursive thought. What is our base case? Assuming that our piles will not violate the size-order rule,
// 2 base cases come to mind. Given the disks in the right spot, VOILA! done. This can also be interpreted as the first two stacks being empty, right? 
// I imagine both are valid base cases, but too me, it seems easier to 'make progress'(recursive thoughts!) to emptying the first two stacks. So we have some
// rules, a base case, and some basic variables to implement. Lets go!


// Implementation of towers game board. Represents roughly an initial state of:

// 		|			|			|
// 		X			|			|
// 	   XXX			|			|
// 	  XXXXX			|			|
// 	 XXXXXXX		|			| 
// 000000000000000000000000000000000000000
// A or towers[0]..........towers[2] or C


var towers = [
		[7,5,3,1],
		[],
		[]
	]
// Great! towers represented!
// and now some base case-age!

function toh(towers){
	if(towers[0].length < 1 && towers[1].length < 1){
		return "woot!";
	}
}

// So now how exactly do we solve this thing?
// Our base case is that our first two stacks are emptied. So lets empty them?
// let's just see how this works out first. assuming we have [4,3,2,1] as tower 1...

	A 	 	B 		C
4321
432		1				*why only 1 over? 	>because it goes in the 'closest one', loop starts at 0
43		1		2
43				21		*this move. it is wrong. why not 431		2?!?!
4		3		21
41		3		2		*why not 4  31 2?	>because it wraps around :) and goes to closest one, loop starts at 0
41      32				*why not 4  31 2?	>ditto above, loop starts at 0
4 		321			
		321		4
		32		41		*why not 1  32 4?	>1 32 4 works! and fits our algorithm properly!
2		3		41
21		3		4
21				43
2		1		43		*why not 2	   431?	>it looks for first opportunity
		1		432
				4321



alternate world
1		32		4
1		3		42
		31		42
2		31		4
21		3		4
21				43

4321
432				1
43		2		1
43		21		
4		21		3
4		2		31
42				31
42		3		1
4		32		1
42		3		1
42		31		
4		31		2
4		3		21
43		21		repeats



// So based off our solving of the game, we have a few things we have to keep in mind when making a move. We start on the leftmost tower and work rightwards when looking for a piece to move.
// We don't move the same piece 2 times in a row. This avoids loops and getting stuck in places. We start looking for a place to put our moving piece from left to right as well. And we put it in the first place we can.
// Once we make a move, we need to recheck our game state, right? So we need this function to break when we make a move orrrr only run while we haven't made a move. 
// So what does our two for loops, and holder variable look like? 

// this sees if we have moved yet.
var moved = false;
// this is to keep track of last moved
var last_moved;
// our loop that finds our piece that we will try to move
for (var i = 0; i < towers.length; i++){
	// keeps track of whether we moved or not
	while (moved = false){
		// now we have to compare it to each of the towers to see if its move-able
		// remember we go left to right
		for (var j=0; j < towers.length; j++){
			// then we just gotta do some comparing real quick. More on that in a second
		}
	}
}

// at this point we have made a move and need to check the game state again. Time to recurse!!!
toh(towers);

// So what do we need to do once we find a place to put a piece? Well, we need to take the last value off of the "i" stack and put it on the "j" stack. 
// We can move the piece if it is not the last_moved piece AND it is less than the "top" value in the "j" stack. So a few pieces to stitch together:
// pseudocode:
if ( top of i is not last_moved){
	if (moveable to j){
		move to j;
		trigger move
	}
	if not moveable, move on 
}
if its last_moved, move on.

// So that's pretty groovy, but at this point a question arises. Will it break out of the while loop? Lets stitch it all together and see what we have going on!
function toh(towers){
	if(towers[0].length < 1 && towers[1].length < 1){
		for (var tower in towers){
			console.log(tower);
		}
		return "woot!";
	}
	var moved = false;
	var last_moved;
	for (var i = 0; i < towers.length; i++){
		while (moved = false){
			for (var j = 0; j < towers.length; j++){
				if (towers[i][towers[i].length] != last_moved){
					if (towers[i][towers[i].length] > towers[j][towers[j].length]){
						towers[j].push(towers[i].pop());
						moved = true;
					}
				}
			}
		}
	}
	// should we return this? who know! we probably should? because we want to keep calling this until it returns woot for us.
	return toh(towers);
}
