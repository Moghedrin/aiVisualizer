function search(fringe, world, startState, goalTest, graph) {
	var tofringe = new node(startState, world);
	fringe.push(tofringe);
	while (true) {
		if (fringe.isEmpty()) {
			return null;
		}
		var state = fringe.pop();
		var ind = state.x + state.y * world.size;
		if (graph && world.cell[ind].visited) {
			continue;
		}
		world.cell[ind].visited = true;
		$('#td' + String(ind)).addClass('visited');
		if (goalTest(state)) {
			return state;
		}
		actionList = state.actionList();
		for (var i = 0; i < actionList.length; i++) {
			var topush = state.applyAction(actionList[i]);
			if (!world.cell[topush.x + topush.y * world.size].visited) {
				fringe.push(topush);
			}
		}
	}
}
function searchType(container) {
	return function(goalTest, startState) {
		search(container, goalTest, startState);
	}
}
compareGenerator = function (world, evalStr, type) {
	eval('var heuristic = function (worldObject, state) {' + evalStr + '}');
	return function(a, b) {
		var aval = heuristic(world, a);
		var bval = heuristic(world, b);
		if (type == 'astar') {
			aval += a.cost;
			bval += b.cost;
		}
		if (aval > bval) {
			return -1;
		}
		else if (aval < bval) {
			return 1;
		}
		return 0;
	};
};
function node(ancestor, world) {
	this.__proto__ = ancestor;
	this.cost = this.cost + 1;
	this.applyAction = function(actionFunc) {
		var toret = new node(this, world);
		actionFunc(toret);
		return toret;
	}
	this.actionList = function() {
		var toret = [];
		var up = this.x + (this.y-1) * world.size;
		var down = this.x + (this.y+1) * world.size;
		var left = this.x - 1 + this.y * world.size;
		var right = this.x + 1 + this.y * world.size;
		if (up >= 0 && !world.cell[up].obstacle) {
			toret.push (
				function(c) {
					c.y -= 1;
				}
			);
		}
		if (down < world.size * world.size && !world.cell[down].obstacle) {
			toret.push (
				function(c) {
					c.y += 1;
				}
			);
		}
		if (this.x - 1 >= 0 && !world.cell[left].obstacle) {
			toret.push (
				function(c) {
					c.x -= 1;
				}
			);
		}
		if (this.x + 1 < world.size && !world.cell[right].obstacle) {
			toret.push (
				function(c) {
					c.x += 1;
				}
			);
		}
		return toret;
	}
}
//--------------------------------------------------------------------------------//
function generateWorld(size) {
	var world = {size : size, cell : [], start : {}, end : {}};
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var k = String(j + i * size);
			var td = $('#td' + k);
			if (td.hasClass('start')) {
				world.start.x = j;
				world.start.y = i;
				world.start.cost = 0;
			}
			else if (td.hasClass('end')) {
				world.end.x = j;
				world.end.y = i;
			}
			!world.cell.push({obstacle : td.hasClass('obstacle'), visited : false});
		}
	}
	return world;
}
