function Queue() {}
Queue.prototype = new buckets.Queue();
Queue.prototype.push = Queue.prototype.enqueue;
Queue.prototype.pop = Queue.prototype.dequeue;

function PriorityQueue(compare) {
	this.__proto__ = new buckets.PriorityQueue(compare);
}
PriorityQueue.prototype.push = Queue.prototype.enqueue;
PriorityQueue.prototype.pop = Queue.prototype.dequeue;

//#TODO Test this, make certain it actually does what I think it ought to.
