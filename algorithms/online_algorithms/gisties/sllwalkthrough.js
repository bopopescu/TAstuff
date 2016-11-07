function slNode(val){
    this.val = val;
    this.next = null;
}

function slList(){
    this.head       = null;     
    this.size       = 0;         // twist on .length
    this.addBack    = addBack;   // adds a node to back 
    this.isEmpty    = isEmpty;   // returns if list is empty
    this.contains   = contains;  // returns if list contains node with val
    this.addFront   = addFront;  // adds a node to list front
    this.removeIdx  = removeIdx; // removes a node at specific index
    this.insert     = insert;    // inserts a node at specific index
    // this.removeVal  = removeVal; // removes node with passed in value
    this.represent  = represent; // list representation of slList
}

function represent(){
    var list_self = [];
    if (!this.head){
        console.log(list_self);
        return this;
    } else {
        var cur = this.head; 
        while(cur){
            list_self.push([cur.val, cur.next]);
            cur = cur.next;
        }
        console.log(list_self);
        return this;
    }
}

function addBack(val){
    if (!this.head){
        this.head = new slNode(val);
        return this;
    }
    var curr = this.head;
    while (curr.next){
        curr = curr.next;
    }
    curr.next = new slNode(val);
    this.size++;
    return this;
}

function isEmpty(){
    return (this.head == null);
}

function contains(val){
    var cur = this.head;
    while(cur){
        if(cur.val == val){
            return true;
        }
        cur = cur.next;
    }
    return false;
}

function addFront(val){
    var n = new slNode(val);
    n.next = this.head;
    this.head = n;
    return this;
}

function removeIdx(idx){
    if (this.head){
        if (idx == 0){
            this.head = this.head.next;
            return this;
        }
        var cur = this.head;
        var count = idx;
        // '0 indexed slList'
        while(count > 1){
            if (cur.next){
                cur = cur.next;
                count--;
            } else {
                console.log("index out of range");
            }
        }
        // at this point, cur is before node we want to remove
        cur.next = cur.next.next;
        return this;
    }
    return this;
}

// no negatives yet lol
function insert(val, idx){
    // go to index
    var n = new slNode(val);
    if (this.head){
        // edge case
        if (idx == 0){
            n.next = this.head;
            this.head = n;
        } else {
            // normal behaviors
            var cur = this.head;
            var count = idx;
            // '0 indexed slList'
            while(count > 1){
                if (cur.next){
                    cur = cur.next;
                } else {
                    console.log("index out of range");
                }
            }
            // insertion time
            var temp = cur.next;
            cur.next = n;
            n.next = temp;
        }
    }
    return this;
}

// function removeVal(val){
    
// }

var bob = new slList();
bob.addBack(1).addBack(2).addBack(3).addBack(4).addBack(5).represent();
console.log(bob.isEmpty());
console.log(bob.contains(3));
bob.addFront(10).represent();
bob.removeIdx(2);
bob.represent();
