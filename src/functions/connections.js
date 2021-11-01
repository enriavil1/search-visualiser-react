// checks if the node being requested is a valid node and returns the node if it is valid
const get_Node = (grid, row, column) => {
	if (
		row < grid.length &&
		row >= 0 &&
		column < grid[0].length &&
		column >= 0 &&
		grid[row][column] !== "wall"
	)
		return { row: row, column: column };
	return null;
};

// returns a key value pair of all the connections a node has
// the key is the node
// the value is a list of connections
export const makeConnections = (grid) => {
	let connections = {};
	let currentConnections = [];

	//checking all sides of current node
	let currentNode;
	let topNode;
	let bottomNode;
	let rightNode;
	let leftNode;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			currentNode = { row: i, column: j };
			if (currentNode === "wall") continue;
			topNode = get_Node(grid, i - 1, j);
			bottomNode = get_Node(grid, i + 1, j);
			rightNode = get_Node(grid, i, j + 1);
			leftNode = get_Node(grid, i, j - 1);

			currentConnections = [topNode, bottomNode, rightNode, leftNode];
			connections[`${currentNode.row}, ${currentNode.column}`] =
				currentConnections;
		}
	}
	return connections;
};
