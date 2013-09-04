function Queue() {
	this.__proto__ = new buckets.Queue();
	this.__proto__.push = this.enqueue
	this.__proto__.pop = this.dequeue
}

function PriorityQueue(compare) {
	this.__proto__ = new buckets.PriorityQueue(compare);
	this.__proto__.push = this.enqueue
	this.__proto__.pop = this.dequeue
}
