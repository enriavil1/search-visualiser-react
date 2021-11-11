export const turnIntoNode = (coordinates) => {
	let split = coordinates.trim().split(",");
	let row = Number(split[0]);
	let column = Number(split[1]);
	return { row: row, column: column };
};

export const turnIntoString = (node) => {
	return `${node?.row}, ${node?.column}`;
};

export const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// checks if the node being requested is a valid node and returns the node if it is valid
export const get_Node = (grid, row, column) => {
	if (row < grid.length && row >= 0 && column < grid[0].length && column >= 0 && grid[row][column] !== "wall") return { row: row, column: column };
	return null;
};

// will walk backwards from the end point to the start point using predecessor which is a currentNode => previousNode key value pair
export const buildPath = (predecessor, startingNode, endingNode) => {
	const startingNodeCoordinates = turnIntoString(startingNode);
	const endingNodeCoordinates = turnIntoString(endingNode);

	const stack = [];

	let beforeNode = predecessor[endingNodeCoordinates];

	while (beforeNode !== startingNodeCoordinates) {
		stack.push(beforeNode);
		beforeNode = predecessor[beforeNode];
	}

	// returning the reverse of the stack so we go from starting point to ending point since the stack was made from ending to starting
	return stack.reverse();
};

export const buildBidirectionalPath = (startingPredecessors, endingPrecessors, startNode, endNode, meetingNode) => {
	const startingNodeCoordinates = turnIntoString(startNode);
	const endingNodeCoordinates = turnIntoString(endNode);
	const meetingNodeCoordinates = turnIntoString(meetingNode);

	const endStack = [meetingNodeCoordinates];

	let beforeEndNode = endingPrecessors[meetingNodeCoordinates];

	while (beforeEndNode !== endingNodeCoordinates) {
		endStack.push(beforeEndNode);
		beforeEndNode = endingPrecessors[beforeEndNode];
	}

	const startStack = [];
	let beforeStartNode = startingPredecessors[meetingNodeCoordinates];
	while (beforeStartNode !== startingNodeCoordinates) {
		startStack.push(beforeStartNode);
		beforeStartNode = startingPredecessors[beforeStartNode];
	}
	startStack.reverse();

	// returning the reverse of the stack so we go from starting point to ending point since the stack was made from ending to starting
	return [...startStack, ...endStack];
};

// heuristic function for A* which is used for scoring a 2 dimensional graph (can only move: up, down, left, right)
export const manhattanDistance = (fromNode, toNode) => {
	const d1 = Math.abs(fromNode.column - toNode.column);
	const d2 = Math.abs(fromNode.row - toNode.row);

	return d1 + d2;
};

// heuristic function which is used for scoring a 2 dimensional graph that can move diagonally
export const diagonalDistance = (fromNode, toNode) => {
	const lengthOfNode = 1;
	const diagonalLenghtOfNode = Math.sqrt(2);

	const d1 = Math.abs(fromNode.column - toNode.column);
	const d2 = Math.abs(fromNode.row - toNode.row);
	const h_score = lengthOfNode * (d1 + d2) + (diagonalLenghtOfNode - 2 * lengthOfNode) * Math.min(d1, d2);

	return h_score;
};

// heuristic function which gets the distance using the hypothenus
export const euclideanDistance = (fromNode, toNode) => {
	const d1 = fromNode.column - toNode.column;
	const d2 = fromNode.row - toNode.row;

	const h = Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2));

	return h;
};

// lowest final score in an openset
export const lowestFinalScoreNode = (openSet, finalScore) => {
	let lowestScore = -1; // lowest score can never be a negative number, so if it starts as one then we know it is empty
	let lowestNodeString = null;
	for (let nodeString of openSet) {
		if (lowestScore === -1) {
			lowestScore = finalScore[nodeString];
			lowestNodeString = nodeString;
		}

		if (finalScore[nodeString] < lowestScore) {
			lowestScore = finalScore[nodeString];
			lowestNodeString = nodeString;
		}
	}

	return lowestNodeString;
};
