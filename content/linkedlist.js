// linked list + node
// list
function slList(){
	this.head = null;
	this.tail = null;
	this.addBack = addBack;
	this.size = size;
}


// node
function slNode(val){
	this.val = val;
	this.next = null;
}


// add
function addBack(val){
	var n = new slNode(val);
	if (!this.head){
		this.head = n;
		this.tail = n;
	} 
	// else {
	// 	var curr = this.head;
	// 	while(curr.next){
	// 		curr = curr.next;
	// 	}
	// 	curr.next = n;
	// 	this.tail = n;
	// }
	this.tail.next = n;
	this.tail = n;
	return this;
}

// length
function size(){
	var count = 0;
	if (!this.head){
		return count;
	} else {
		var curr = this.head;
		count = 1;
		while(curr.next){
			curr = curr.next;
			count++;
		}
	}
	return count;
}

var bob = new slList();
bob.addBack(3).addBack(4).addBack(5).addBack(6);
console.log(bob.size());