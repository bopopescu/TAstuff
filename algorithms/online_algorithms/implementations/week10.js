// arrStack implementation, Weak Finger


// implement a stack using an array. Stack is LIFO
// functions is push, pop, top, contains, isEmpty, size
function stack(){
	this.data = [];
	this.push = push;
	this.pop = pop;
	this.top = top;
	this.contains = contains;
	this.isEmpty = isEmpty;
	this.size = size;
}

function push(val){
	this.data.push(val);
	return this;
}

function pop(){
	// could just use pop... but we will do otherwise
	var popped = this.data[this.data.length-1];
	this.data.length = this.data.length-1;
	return popped;
}

function top(){
	return this.data[this.data.length-1];
}

function contains(){
	// not using indexOf...
	for (var i = 0; i < this.data.length; i++){
		if (this.data[i] == val){
			return true;
		}
	}
	return false;
}

function isEmpty(){
	return this.data.length < 1;
}

// WEAK FINGER
// imagine you can count only using 1 hand, eg, to count to eleven you would count all your fingers twice plus one
// now imagine you have a finger that can only be used a few times because it is weaker than the others. How high can you count 
// now with that finger as weak as it is? function will be given a finger and how weak it is.
// *you "move" left to right to left to right


// not going to use silly maths (%8) to do this
function weakFinger(finger, durability){
	var count = 0;
	var direction = "right";
	var counting_finger = 1;
	var durability = durability;
	while (durability > -1 && count < 100){
		// console.log(counting_finger,finger,durability,count, direction);
		if (counting_finger == finger){
			durability--;
		}
		if(counting_finger == 5){
			direction = "left";
		} else if(counting_finger == 1){
			direction = "right";
		}
		if (direction == "left"){
			counting_finger--;
		} else {
			counting_finger++;
		}
		count++;
	}
	return count;
}

weakFinger(5,0);
