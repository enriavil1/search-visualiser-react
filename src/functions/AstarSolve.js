import { buildPath, lowestFinalScoreNode, manhattanDistance, turnIntoNode, turnIntoString } from "./utils";

export const AStarSolve = (graph, startNode, endNode) => {
	const startingNodeCoordinates = turnIntoString(startNode);

	// predecessor is a currentNode => previous node key value pair
	// used to build the final path
	const predecessor = [];
	predecessor[startingNodeCoordinates] = null;

	const closedSet = new Set(); // visited nodes
	const openSet = new Set(); // nodes to be visited

	const score = []; // a map of the node => the cost of the start along the best known path
	score[startingNodeCoordinates] = 0;

	const finalScore = [];
	finalScore[startingNodeCoordinates] = score[startingNodeCoordinates] + manhattanDistance(startNode, endNode);

	openSet.add(startingNodeCoordinates); // first node that we know we are going to look at

	while (openSet.size > 0) {
		const currentNodeString = lowestFinalScoreNode(openSet, finalScore);
		const currentNode = turnIntoNode(currentNodeString);

		openSet.delete(currentNodeString);
		closedSet.add(currentNodeString);

		if (currentNode.row === endNode.row && currentNode.column === endNode.column) {
			const path = buildPath(predecessor, startNode, endNode);
			closedSet.delete(startingNodeCoordinates);
			return path, closedSet;
		}

		for (let neighbor of graph[currentNodeString]) {
			const neighborString = turnIntoString(neighbor);

			console.log(openSet);
			if (closedSet.has(neighborString) || neighbor === null) continue;

			const currentCost = score[currentNodeString] + manhattanDistance(currentNode, neighbor); // distance between currentNode to neighbor
			if (!openSet.has(neighborString) || currentCost < score[currentNodeString]) {
				openSet.add(neighborString);
				predecessor[neighborString] = currentNodeString;
				score[neighborString] = currentCost;
				finalScore[neighborString] = currentCost + manhattanDistance(neighbor, endNode);
			}
		}
	}

	return [], closedSet;
};
