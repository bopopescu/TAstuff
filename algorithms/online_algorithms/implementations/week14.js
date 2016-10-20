// WEEK 14 SLL pt. II
// loops has, break, number

// checks if a singly linked list has a loop
function hasLoop(sll){
	// sll checks balh blah balh
	var turtle = sll.head;
	var rabbit = sll.head.next;
	while(turtle.next || rabbit.next){
		if (turtle == rabbit){
			return true;
		}
		turtle = turtle.next;
		rabbit = rabbit.next.next;
	}
	return false;
}

// break the loop
function loopBreaker(sll){
	// sll and loop checks blah blah
	// find where loop starts...the long way
	var looking = true;
	var anchor = sll.head;
	while (looking){
		var boat = anchor.next;

	}
}

// how long is the looped part of the list?
function loopLength(sll){
	// sll + loop checks
	var base = sll.head;
	var runner = base.next;
	// get into loop
	while (base != runner){
		base = base.next;
		runner = runner.next.next;
	}
	// at this point we are in loop and aligned
	var count = 1;
	while (base != runner){
		base = base.next;
		runner = runner.next.next;
		count++;
	}
	return count;
}