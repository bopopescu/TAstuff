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
	if (!this.head){
		this.head = node;
		return this;
	}
	var curr = this.head;
	while (!curr.next){
		curr = curr.next;
	}

}

function length2(node) {
  console.log((node instanceof listNode));
  if (node instanceof listNode) {
    len = 1;
    var cursor = node;
    while(cursor.next){
      cursor = cursor.next;
      len++;
    }
  }
  else {
    return 0;
  }
  return len;
}

function isNode(anode){
	return (anode instanceof node);
}

var x;
console.log(!(x instanceof String));