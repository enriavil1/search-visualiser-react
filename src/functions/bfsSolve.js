function isNodeValid(graph, row, column, visited) {
	if (
		!visited[`${row}, ${column}`] &&
		row < graph.length &&
		row >= 0 &&
		column < graph[0].length &&
		column >= 0 &&
		graph[row][column] !== "wall"
	)
		return { row: row, column: column };
	return null;
}

function isCurrentEqualTarget(currentNode, targetNode) {
	return (
		currentNode.row === targetNode.row &&
		currentNode.column === targetNode.column
	);
}

export function bfs(graph, current, endingNode, path = [], visited = {}) {
	let top;
	let bottom;
	let right;
	let left;

	if (isCurrentEqualTarget(current, endingNode)) {
		path.push(current);
		return { path, visited };
	}

	//checks if the current node has a top bottom right or/and left node that can be visited
	top = isNodeValid(graph, current.row - 1, current.column, visited);
	bottom = isNodeValid(graph, current.row + 1, current.column, visited);
	right = isNodeValid(graph, current.row, current.column + 1, visited);
	left = isNodeValid(graph, current.row, current.column - 1, visited);

	//checks if nodes exist and if they do it adds them to visited
	if (top) visited[`${top.row}, ${top.column}`] = true;

	if (bottom) visited[`${bottom.row}, ${bottom.column}`] = true;

	if (right) visited[`${right.row}, ${right.column}`] = true;

	if (left) visited[`${left.row}, ${left.column}`] = true;

	//adds visitable nodes into the queue to be checked
	if (top) {
		path.push(top);
		return bfs(graph, top, endingNode, path, visited);
	}

	if (bottom) {
		path.push(bottom);
		return bfs(graph, bottom, endingNode, path, visited);
	}

	if (right) {
		path.push(right);
		return bfs(graph, right, endingNode, path, visited);
	}

	if (left && !visited[`${left.row}, ${left.column}`]) {
		path.push(left);
		return bfs(graph, left, endingNode, path, visited);
	}

	return { path: [], visited: [] };
}
