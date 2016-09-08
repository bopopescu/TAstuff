// push pop shift unshift insert
function node(val){
	this.value = val;
	this.next = null;
}

function sLL(){
	this.head = null;
}

sLL.prototype.add = function(node){
	if (!this.head){
		this.head = node;
	}else{
		this.head.next = node;
	}
}