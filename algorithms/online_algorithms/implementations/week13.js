// Week 13 Singly Linked List palindrome, Kth to last node, reverse

// need a singly linked list!
function sllNode(val){
	this.val = val;
	this.next = null;
}

function sLL(){
	this.head = null;
	this.add = add;
	this.isPal= isPal;
	this.kth = kth;
	this.reverse = reverse;
	this.arrShow = arrShow;

}

function arrShow(){
	var curr = this.head;
	var array = [];
	while(curr.next){
		array.push(curr.val);
		curr = curr.next;
	}
	array.push(curr.val);
	console.log(array);
	return this;
}

function add(val){
	n = new sllNode(val);
	if (this.head == null){
		this.head = n;
		return this;
	}
	var curr = this.head;
	while(curr.next != null){
		curr = curr.next;
	}
	curr.next = n;
	return this;

}

// iterative
function isPal(){
	var curr = this.head;
	var stack = [];
	while (curr){
		stack.push(curr.val);
		curr = curr.next;
	}
	curr = this.head;
	while(curr){
		if (stack.pop() !== curr.val){
			return false;
		}
		curr = curr.next;
	}
	return true;
}

// using a buffer node
function kth(k){
	var curr = this.head;
	var buffer = curr;
	for (var i = 0; i < k; i++){
		if (buffer.next){
			buffer = buffer.next;
		} else {
			return ("list is too short for that");
		}
	}
	while(buffer.next){
		buffer = buffer.next;
		curr = curr.next;
	}
	return curr.val;
}

// recursive reversal
function reverse(){
	// not worried about length <= 2 right now...
	var curr = this.head;
	var buffer = curr.next;
	while (curr.next != null){
		this.arrShow();
		var temp = buffer.next;
		buffer.next = this.head;
		curr.next = temp;
		this.head = buffer;
		buffer = temp;
	}
	this.arrShow();
	curr.next = null;
	this.head = buffer;
	
	return this;
}

var bross = new sLL();
bross.add(1);
bross.add(2);
bross.add(3);
bross.add(4);
bross.add(5);
console.log(bross);
console.log(bross.isPal());
console.log(bross.kth(2));
bross.reverse();