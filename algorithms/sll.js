// push pop shift unshift insert
function node(val){
	this.value = val;
	this.next = null;
}

function sLL(){
	this.head = null;
	this.add = add;
}

function add(node){
	if !(this.head){
		this.head = node;
		return this;
	}
	var curr = this.head;
	while (!curr.next){
		curr = curr.next;
	}

}
