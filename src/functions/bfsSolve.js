export function bfs(graph, startingNode, endingNode) {
	const startingNodeCoordinates = `${startingNode.row}, ${startingNode.column}`;
	let neighborCoordinates;
	let path = [startingNodeCoordinates];

	let vertexAndPath = [startingNodeCoordinates, path];

	let bfs_queue = [vertexAndPath];

	let visited = [];

	while (bfs_queue.length) {
		let [currentNodeCoordinates, path] = bfs_queue.shift();

		visited.push(currentNodeCoordinates);

		for (let neighbor of graph[currentNodeCoordinates]) {
			if (neighbor === null) continue;
			neighborCoordinates = `${neighbor.row}, ${neighbor.column}`;

			if (visited.includes(neighborCoordinates) === false) {
				console.log(neighborCoordinates);
				if (
					neighbor.row === endingNode.row &&
					neighbor.column === endingNode.column
				) {
					return [path, visited];
				}
				path.push(neighborCoordinates);
				bfs_queue.push([neighborCoordinates, path]);
			}
		}
	}
	return [[], []];
}
