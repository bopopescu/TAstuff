##Singly-linked Lists cont.

So far we have implemented our singly-linked list class as such:

__spoilers below, if you haven't attempted to implement a linked list, give it a shot for a bit first__

_maybe it works, maybe it doesn't_ :smiling_imp:

	function slNode(val){
		this.val = val;
		this.next = null;
	}

	function slList(){
		this.head = null;
		this.addBack = addBack;
		this.length = length;
	}

	function addBack(node){
		if (!this.head){
			this.head = node;
		}
		var curr = this.head;
		while (curr.next){
			curr = curr.next;
		}
		curr.next = new slNode(val);
		this.head = curr.next;
		return this;
	}

	function length(){
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
		return count;
	}

####Small Next Steps
Now that we have a way to add a node to the end and can see how long our linked list is, it is time to add some more functionality. The first 2 bits should be a fairly straightforward. We want to add an isEmpty(), a class method that returns true/false if the list is empty or not. Next, add .contains(val), another class method that returns true or false depending if their is a node with the passed value in the list. And next, add an addFront(val) method that adds a new node with the passed in value to the front of your list. These should be straightforward if you've done length and addBack. Converse on slack to get through these.

In summation:
- [ ] .isEmpty()
- [ ] .contains(val)
- [ ] .addFront(val)

####Bigger Steps
If you feel comfortable having implemented contains,isEmpty,and addFront, it's time to up the game a bit. Next add *.insert(val, idx)* which will add a new node with the value passed in at the list 'index' passed in and return the updated list. Singly linked lists don't have indexes, so this is actually just how many nodes in the value should be inserted. Negative values should be from the end of the list(remember the handy-dandy length function we have?) and if the 'index' is out of range, it should just be added to the end of the list. After insertion comes *.removeIdx(idx)* which removes a node at the idx-th index. Very similar to insert, it finds the node at the passed in index and removes it. And lastly create *.removeVal(val)* that removes the first node that has a value that matches what you pass in to it and returns the list. If there are no values that match, it should just return the list.

In summation:
- [ ] .insert(val, idx)
- [ ] .removeIdx(idx)
- [ ] .removeVal(val)

####Tips:
* [this is a great visualization tool for linked lists.](https://visualgo.net/list) Definitely toy around with it
* Go to the above link.
* If nothing points at a node, it can't be accessed anymore.
* Remember .next is a reference to a location in memory.
* Remember .next is a pointer to an object
* Algorithm slack channel is great!