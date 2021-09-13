export function bfs(graph, grid, startingNode, endingNode) {
	const startingNodeCoordinates = {
		row: startingNode.row,
		column: startingNode.column,
	};
	const endingNodeCoordinates = {
		row: endingNode.row,
		column: endingNode.column,
	};
	let path = [startingNodeCoordinates];

	let vertexAndPath = [startingNodeCoordinates, path];

	let bfs_queue = [vertexAndPath];

	let visited = [];

	while (bfs_queue) {
		let [currentNodeCoordinates, path] = [bfs_queue.shift()];

		visited.push(currentNodeCoordinates);

		for (let neighbor in graph[currentNodeCoordinates]) {
			if (neighbor === null) continue;
			if (!visited.includes(neighbor) && neighbor !== null) {
				if (neighbor === endingNodeCoordinates) {
					return [path, visited];
				}
				bfs_queue.append([neighbor, path.concat([neighbor])]);
			}
		}
	}
}
