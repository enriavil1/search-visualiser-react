export const turnIntoNode = (coordinates) => {
	let split = coordinates.trim().split(",");
	let row = Number(split[0]);
	let column = Number(split[1]);
	return { row: row, column: column };
};

export const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// will walk backwards from the end point to the start point using predecessor which is a currentNode => previousNode key value pair
const buildPath = (predecessor, startingNode, endingNode) => {
	const startingNodeCoordinates = `${startingNode.row}, ${startingNode.column}`;
	const EndingNodeCoordinates = `${endingNode.row}, ${endingNode.column}`;

	const stack = [];

	let beforeNode = predecessor[EndingNodeCoordinates];

	while (beforeNode !== startingNodeCoordinates) {
		stack.push(beforeNode);
		beforeNode = predecessor[beforeNode];
	}

	// returning the reverse of the stack so we go from starting point to ending point since the stack was made from ending to starting
	return stack.reverse();
};

export function bfs(graph, startingNode, endingNode) {
	const startingNodeCoordinates = `${startingNode.row}, ${startingNode.column}`;

	// predecessor is a currentNode => previous node key value pair
	// used to build the final path
	const predecessor = [];
	predecessor[startingNodeCoordinates] = null;

	const bfs_queue = [startingNodeCoordinates]; // queue starting from the starting point

	const visited = new Set();

	while (bfs_queue.length) {
		let currentNodeCoordinates = bfs_queue.shift();

		let currentNode = turnIntoNode(currentNodeCoordinates);

		if (
			currentNode.row === endingNode.row &&
			currentNode.column === endingNode.column
		) {
			const path = buildPath(predecessor, startingNode, endingNode);
			visited.delete(startingNodeCoordinates); // because we dont want to paint over the starting node
			return [path, visited];
		}

		// will loop through all the edge nodes and check if they are visited if they are nothing happens
		for (let neighbor of graph[currentNodeCoordinates]) {
			if (neighbor === null) continue;
			let neighborCoordinates = `${neighbor.row}, ${neighbor.column}`;

			// if neighbor node is has not been visited then it will add it into the visited list, create a predecessor spot, and then add it to the queue to check
			if (!visited.has(neighborCoordinates)) {
				visited.add(currentNodeCoordinates);
				predecessor[neighborCoordinates] = currentNodeCoordinates;
				bfs_queue.push(neighborCoordinates);
			}
		}
	}
	visited.delete(startingNodeCoordinates); // because we dont want to paint over the starting node
	return [[], visited];
}
