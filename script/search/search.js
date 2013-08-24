function node(base, getactions, ancestor) {
	toret = Object.create(base);
	toret.prototype.attrs = attrs;
	toret.prototype.actionList = getactions(base);
	toret.prototype.ancestor = ancestor;
}

function search(fringe, goalTest, startState) {
	while (true) {
		if (fringe.isEmpty()) {
			return nil;
		}
		state = fringe.pop();
		if (goalTest(state)) {
			return state;
		}
		actionList = state.actionList();
		for (var i = 0; i < actionList.length; i++) {
			fringe.push(state.applyAction(actionList[i]));
		}
	}
}
//--------------------------------------------------------------------------------//
function generateStates(size) {
	stateDict = {};
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var k = String(j + i * size);
			var td = $('#td' + k);
			stateDict[k] = {x : parseInt(td.attr('x')), y : parseInt(td.attr('y')), wall : td.hasClass('obstacle')};
			if (td.hasClass('start') {
				stateDict['start'] = k;
			}
			if (td.hasClass('end') {
				stateDict['end'] = k;
			}
		}
	}
}
