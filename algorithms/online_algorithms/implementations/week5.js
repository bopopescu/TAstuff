// Binary Search Trees! Yeeayy!
// Implementing basic 6 functionalities
// Implementing node-based class



// bstNode, left is <=, right is >
function bstNode(val, left, right){
	this.val = val;
	this.left = left || null;
	this.right = right || null;
}

// BST, has node and some functions
function bst(root){
	this.root = root;

	// functionsss
	this.insert = insert;
	this.isEmpty = isEmpty;
	this.size = size;
	this.min = min;
	this.max = max;
	this.contains = contains;
}

function insert(val){
	var n = new bstNode(val, null, null);
	if (!this.root){
		this.root = n;
		return this;
	}
	var curr = this.root;
	add(curr);
	function add(node){
		if (n.val < node.val){
			if (node.left != null){
				add(node.left);
			} else {
				node.left = n;
				return this;
			}
		} else {
			if (node.right != null){
				add(node.right);
			} else {
				node.right = n;
				return this;
			}
		}
	}
	return this;
}

// returns if tree is empty or not
function isEmpty(){
	if (this.root){
		return false;
	} else {
		return true;
	}
}

// returns how many nodes are in the tree
function size(){
	if (!this.root){
		return 0;
	}
	var curr = this.root;
	var count = 0;
	function measure(node){
		if (node){
			count ++;
			measure(node.left);
			measure(node.right);
		}
		return count;
	}
	return measure(curr);
}

// returns smallest value in tree
function min(){
	var curr = this.root;
	while(curr.left){
		curr = curr.left;
	}
	return curr.val;
}

// returns largest value in tree
function max(){
	var curr =this.root;
	while(curr.right){
		curr = curr.right;
	}
	return curr.val;
}

// returns if tree contains a node with given val
function contains(val){
	var curr = this.root;
	while (curr.val != val){
		if (val < curr.val){
			curr = curr.left;
		} else {
			curr = curr.right;
		}
		if (curr == null){
			return false;
		}
	}
	return true;
}

var bob = new bstNode(5);
var bobtree = new bst(bob);
bobtree.insert(3).insert(10).insert(1).insert(15).insert(12).insert(4);
// console.log(bobtree.isEmpty());
// console.log(bobtree.size());
// console.log(bobtree.min());
// console.log(bobtree.max());
console.log(bobtree.contains(66));
console.log(bobtree.contains(12));