// Singly Linked List Implementation. 
// addFront, removeFront, contains, front, back, addback, pop
// length, average, min, max, display

function sllNode(val){
	this.val = val;
	this.next = null;
}

function sll(){
	this.head = null;
	this.front = front;
	this.back = back;
	this.addFront = addFront;
	this.contains = contains;
	this.addBack = addBack;
	this.pop = pop;
	this.length = length;
	this.average = average;
	this.min = min;
	this.max = max;
	this.display = display;
}

function front(){
	if (this.head){
		return this.head;
	} else {
		return null;
	}
}

function back(){
	if (this.head){
		var curr = this.head;
		while (curr.next){
			curr = curr.next;
		}
		return curr.val;
	} else {
		return null;
	}
}

function addFront(val){
	n = new sllNode(val);
	n.next = this.head;
	this.head = n;
	return this;
}

function contains(val){
	if (this.head){
		var curr = this.head;
		while(curr){
			if (curr.val = val){
				return true;
			}
		}
		return false;
	} else {
		return false;
	}
}

function addBack(val){
	n = new sllNode(val);
	if (this.head){
		var curr = this.head;
		while (curr.next){
			curr = curr.next;
		}
		curr.next = n;
	} else {
		this.head = n;
	}
	return this;
}

function pop(){
	if (this.head.next){
		var curr = this.head;
		while(curr.next.next){
			curr = curr.next;
		}
		curr.next = null;
		return this;
	} else {
		this.head = null;
		return this;
	}
}

function length(){
	if (this.head){
		var curr = this.head;
		var count = 1;
		while(curr.next){
			curr = curr.next;
			count++;
		}
		return count;
	} else {
		return 0;
	}
}

function average(){
	if (this.head){
		var curr = this.head;
		var count = 1.0;
		var sum = curr.val;
		while(curr.next){
			curr = curr.next;
			count++;
			sum += curr.val;
		}
		return (sum/count);
	} else {
		return null;
	}
}

function min(){
	if (this.head){
		var curr = this.head;
		var min = curr.val;
		while(curr.next){
			if (curr.val < min){
				min = curr.val;
			} else {
				curr = curr.next;
			}
		}
		return min;
	} else {
		return null;
	}
}

function max(){
	if (this.head){
		var curr = this.head;
		var max = curr.val;
		while(curr.next){
			if (curr.val > max){
				max = curr.val;
			} else {
				curr = curr.next;
			}
		}
		return max;
	} else {
		return null;
	}
}

function display(){
	if (this.head){
		var curr = this.head;
		while(curr.next){
			print (curr.val);
		}
		return this;
	} else {
		print("empty");
		return this;
	}
}