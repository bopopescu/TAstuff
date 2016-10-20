// BST implementation
// find/contains, add, height

// define basic bst structure
// node based
function bstNode(val){
	this.value = val;
	this.left = null;
	this.right = null;
}

function bst(){
	this.root = null;
	this.add = add;
	this.height = height;
	this.contains = contains;
}


// contains
function contains(val){
	if (this.root){
		var curr = this.root;
		while(curr){
			if (curr.value == val){
				return true;
			} else if(curr.value < val){
				curr = curr.right;
			}else{
				curr = curr.left;
			}
		}
		return false;
	} else {
		return false;
	}
}

// add
function add(val){
	new_node = new bstNode(val);
	if (this.root == null){
		this.root = new_node;
	}
	var current = this.root;
	radd(current, new_node);

	function radd(curr, neo){
		if(curr.val < neo.val){
			curr.left ? radd(curr.left, neo) : curr.left = neo;
		} else {
			curr.right ? radd(curr.right, neo) : curr.right = neo;
		}
	}
	
}


// height
function height(){
	if (!this.root){return 0;}
	var curr = this.root;
	return max_height(curr);

	function max_height(curr){
		if (!curr.left) && !(curr.right){
			return 1;
		} else {
			right = curr.left.height() + 1;
			left = curr.right.height() + 1;
			if ( right > left ){
				return right + 1;
			} else {
				return left + 1;
			}
		}
	}
	
}