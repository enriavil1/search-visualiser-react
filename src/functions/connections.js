import { get_Node } from "./utils";

// returns a key value pair of all the connections a node has
// the key is the node
// the value is a list of connections
export const makeConnections = (grid) => {
	let connections = {};
	let currentConnections = [];

	//checking all sides of current node
	let currentNode;
	let topNode;
	let topRideNode;
	let topleftNode;
	let bottomNode;
	let bottomRightNode;
	let bottomLeftNode;
	let rightNode;
	let leftNode;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			currentNode = { row: i, column: j };
			if (currentNode === "wall") continue;
			topNode = get_Node(grid, i - 1, j);
			topRideNode = get_Node(grid, i - 1, j + 1);
			topleftNode = get_Node(grid, i - 1, j - 1);
			bottomNode = get_Node(grid, i + 1, j);
			bottomRightNode = get_Node(grid, i + 1, j + 1);
			bottomLeftNode = get_Node(grid, i + 1, j - 1);
			rightNode = get_Node(grid, i, j + 1);
			leftNode = get_Node(grid, i, j - 1);

			currentConnections = [topNode, topRideNode, topleftNode, bottomNode, bottomRightNode, bottomLeftNode, rightNode, leftNode];
			connections[`${currentNode.row}, ${currentNode.column}`] = currentConnections;
		}
	}
	return connections;
};
