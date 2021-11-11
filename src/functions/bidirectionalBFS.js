import { buildPath, turnIntoNode, turnIntoString, buildBidirectionalPath } from "./utils";

// will run bfs from the endNode and startNode at the sametime until they find each other instead of only the startNode
export const bidirectionalSolve = (graph, startNode, endNode) => {
	const startNodeString = turnIntoString(startNode);
	const endNodeString = turnIntoString(endNode);

	const startNodePredecessors = [];
	startNodePredecessors[startNodeString] = null;

	const endNodePredecessors = [];
	endNodePredecessors[endNodeString] = null;

	const endNodeVisited = [];
	const startNodeVisited = [];

	const startNodeQueue = [startNodeString];
	const endNodeQueue = [endNodeString];

	const paths = [];
	const visited = [];

	while (startNodeQueue.length && endNodeQueue.length) {
		const startCurrentNodeString = startNodeQueue.shift();
		const endNodeCurrentNodeString = endNodeQueue.shift();

		// will check if both visited list have the same node. If they do then that means there is already a path to each other so it returns
		if (startNodeVisited.indexOf(endNodeCurrentNodeString) !== -1) {
			const path = buildBidirectionalPath(startNodePredecessors, endNodePredecessors, startNode, endNode, turnIntoNode(endNodeCurrentNodeString));
			paths.push(...path);
			visited.push(...startNodeVisited);
			visited.push(...endNodeVisited.reverse());

			return [paths, visited];
		}

		// will loop through all the edge nodes and check if they are visited if they are nothing happens
		for (const neighbor of graph[startCurrentNodeString]) {
			if (neighbor === null) continue;
			const neighborCoordinates = turnIntoString(neighbor);

			// if neighbor node is has not been visited then it will add it into the visited list, create a predecessor spot, and then add it to the queue to check
			if (!startNodeVisited.includes(neighborCoordinates)) {
				startNodeVisited.push(startCurrentNodeString);
				startNodePredecessors[neighborCoordinates] = startCurrentNodeString;
				startNodeQueue.push(neighborCoordinates);
			}
		}

		// will loop through all the edge nodes and check if they are visited if they are nothing happens
		for (const neighbor of graph[endNodeCurrentNodeString]) {
			if (neighbor === null) continue;
			const neighborCoordinates = turnIntoString(neighbor);

			// if neighbor node is has not been visited then it will add it into the visited list, create a predecessor spot, and then add it to the queue to check
			if (!endNodeVisited.includes(neighborCoordinates)) {
				endNodeVisited.push(endNodeCurrentNodeString);
				endNodePredecessors[neighborCoordinates] = endNodeCurrentNodeString;
				endNodeQueue.push(neighborCoordinates);
			}
		}
	}

	return [], visited;
};
