import { turnIntoNode, buildPath } from "./utils";

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

		if (currentNode.row === endingNode.row && currentNode.column === endingNode.column) {
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
