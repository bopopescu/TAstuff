// for binary search tree algorithms
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
}




// contains


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