// dedupe sll, removeVal, partition

// sll class stuff
function slNode(val){
	this.val = val;
	this.next = next;
}

function slList(){
	this.head = null;
	this.addNode2Back = addNode2Back;
	this.dedupe = dedupe;
	this.removeVal = removeVal;
	this.partition = partition;
}

// // addstoback make htis val or node workable?
// function addBack(val){

// }

// removes duplicate nodes from a linked list
// lvl 1 using a buffer...slow as fuck...buffering... ... ... ... ... 
function dedupe(){
	if (!this.head){
		return this;
	} else {
		var cur = this.head;
		var buffer = cur;
		// loops cur through
		while(cur.next){
			// as cur moves through, buffer checks for duplicates eachtime
			while(buffer.next){
				if (buffer.next.val == cur.val){
					buffer.next = buffer.next.next;
				} else {
					buffer = buffer.next;
				}
			}
			cur = cur.next;
		}
		return this;
	}
}

// removes first occurence of a slNode(val) in a sll
function removeVal(val){
	if (!this.head){
		return this;
	} else if (this.head.val == val){
		this.head = this.head.next;
		return this;
	} else {
		var cur = this.head;
		while(cur.next){
			if(cur.next.val == val){
				cur.next = cur.next.next;
				return this;
			} else {
				cur = cur.next;
			}
		}
		return this;
	}
}

// partitions a list on a val, nodes wiht val less go in front greater behind
// lazy, not in place 
function partition(val){
	if (!this.head){
		return this;
	} else {
		var left = new slList;
		var right = new slList;
		var mid = new slList;
		var cur = this.head;
		while(cur != null){
			if (cur.val == val){
				mid.addBack(cur.val);
			} else if (cur.val < val){
				left.addBack(cur.val);
			} else {
				right.addBack(cur.val);
			}
			cur = cur.next;
		}
	}
	// assumes our addback typechecks. if not it should.
	return left.addBack(mid.head).addBack(right.head);
}