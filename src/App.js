import "./App.css";
import Node from "./components/Node.js";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { makeConnections } from "./functions/connections";
import { bfs } from "./functions/bfsSolve";
import { AStarSolve } from "./functions/AstarSolve";
import { turnIntoNode, sleep } from "./functions/utils.js";
import { bidirectionalSolve } from "./functions/bidirectionalBFS";

function App() {
	const NUM_OF_ROWS = 30;
	const NUM_OF_COLUMNS = 45;
	const [currentChanger, setCurrentChange] = useState("");
	const [startNode, setStartNode] = useState({ row: null, column: null });
	const [endNode, setEndNode] = useState({ row: null, column: null });
	const [grid, setGrid] = useState([]);
	const [mouseDown, setMouseDown] = useState(false);
	const [solving, setSolving] = useState(false);

	useEffect(() => {
		setGrid(buildGrid(NUM_OF_ROWS, NUM_OF_COLUMNS));
	}, []);

	const buildGrid = (rowLength, columnLength) => {
		const grid = [];

		for (let i = 0; i < rowLength; i++) {
			const currentRow = [];
			for (let j = 0; j < columnLength; j++) {
				currentRow.push("");
			}
			grid.push(currentRow);
		}
		return grid;
	};

	const resetTheGrid = () => {
		setGrid(buildGrid(NUM_OF_ROWS, NUM_OF_COLUMNS));
		setStartNode({ row: null, column: null });
		setEndNode({ row: null, column: null });

		// enables the usage of buttons again
		document.getElementById("start").disabled = false;
		document.getElementById("wall").disabled = false;
		document.getElementById("end").disabled = false;
		setSolving(false);

		setCurrentChange("");
	};

	const eraseVisited = () => {
		let newGrid = [...grid];

		for (let i = 0; i < newGrid.length; i++) {
			for (let j = 0; j < newGrid[i].length; j++) {
				if (newGrid[i][j] === "visited" || newGrid[i][j] === "path") {
					newGrid[i][j] = "";
				}
			}
		}
		document.getElementById("start").disabled = false;
		document.getElementById("wall").disabled = false;
		document.getElementById("end").disabled = false;
		setSolving(false);
		setCurrentChange("");
		setGrid(newGrid);
	};

	const changeCurrentChanger = (activeButton) => {
		if (activeButton === "reset") {
			resetTheGrid();
			return;
		}

		if (activeButton === "erase visited") {
			eraseVisited();
			return;
		}

		setCurrentChange(activeButton);
	};

	const changeState = (row, column) => {
		const node = { row: row, column: column };
		let newGrid = [...grid];

		if (currentChanger === "start") {
			if (startNode.row !== null) {
				newGrid[startNode.row][startNode.column] = "";
			}

			if (node === endNode) {
				newGrid[endNode.row][endNode.column] = "";
				setEndNode({ row: null, column: null });
			}

			setStartNode(node);
			newGrid[node.row][node.column] = currentChanger;
		}

		if (currentChanger === "end") {
			if (endNode.row !== null) {
				newGrid[endNode.row][endNode.column] = "";
			}

			if (node === startNode) {
				newGrid[startNode.row][startNode.column] = "";
				setStartNode({ row: null, column: null });
			}

			setEndNode(node);
			newGrid[node.row][node.column] = currentChanger;
		}

		if (currentChanger === "wall") {
			if (node === startNode) {
				setStartNode({ row: null, column: null });
			}

			if (node === endNode) {
				setEndNode({ row: null, column: null });
			}

			newGrid[node.row][node.column] = currentChanger;
		}

		if (currentChanger === "delete") {
			if (node === startNode) {
				setStartNode({ row: null, column: null });
			}

			if (node === endNode) {
				setEndNode({ row: null, column: null });
			}

			newGrid[node.row][node.column] = "";
		}
		setGrid(newGrid);
	};

	const drawVisited = (row, column) => {
		if (row === startNode.row && column === startNode.column) return;

		if (row === endNode.row && column === endNode.column) return;

		let newGrid = [...grid];

		newGrid[row][column] = "visited";
		setGrid(newGrid);
	};

	const drawPath = (row, column) => {
		let newGrid = [...grid];

		newGrid[row][column] = "path";
		setGrid(newGrid);
	};

	const handleSolve = async (algorithm) => {
		const connections = makeConnections(grid, algorithm === "A*");

		if (!startNode.row && !endNode.row) {
			return;
		}
		let path;
		let visited;

		if (algorithm === "bidirectional") {
			handleBidirectionalSolve(connections);
			return;
		}
		if (algorithm === "bfs") {
			[path, visited] = bfs(connections, startNode, endNode);
		}

		if (algorithm === "A*") {
			[path, visited] = AStarSolve(connections, startNode, endNode);
		}

		// disabling buttons so user doesn't mess with them while or after the path has been found
		document.getElementById("start").disabled = true;
		document.getElementById("wall").disabled = true;
		document.getElementById("end").disabled = true;
		setSolving(true);

		// taking out the current changer
		setCurrentChange("");

		for (let nodeCoordinate of visited) {
			const node = turnIntoNode(nodeCoordinate);
			await sleep(100);
			drawVisited(node.row, node.column);
		}

		for (let nodeCoordinate of path) {
			const node = turnIntoNode(nodeCoordinate);
			await sleep(150);
			drawPath(node.row, node.column);
		}
	};

	const handleBidirectionalSolve = async (connections) => {
		let [path, visited] = bidirectionalSolve(connections, startNode, endNode);

		// i is the beginner pointer and j is the ending pointer
		let i;
		let j;

		// disabling buttons so user doesn't mess with them while or after the path has been found
		document.getElementById("start").disabled = true;
		document.getElementById("wall").disabled = true;
		document.getElementById("end").disabled = true;
		setSolving(true);

		// taking out the current changer
		setCurrentChange("");
		console.log(path);
		console.log(visited);

		i = 0;
		j = visited.length - 1;

		// will create the visited for both path at the same time
		while (i <= visited.length / 2 && j >= visited.length / 2) {
			const startNode = turnIntoNode(visited[i]);
			const endNode = turnIntoNode(visited[j]);

			// so it doesnt slow down and keeps a 100 ms of sleep in the code I divided it by two to keep it feeling smooth and fasts
			await sleep(75);
			drawVisited(startNode.row, startNode.column);
			await sleep(25);
			drawVisited(endNode.row, endNode.column);
			i++;
			j--;
		}

		i = 0;
		j = path.length - 1;

		// will create a path from the starting node until the last point of the end node path
		// the plus and minus allows for it to not leave a whole in the middle between both path if its an odd number
		while (i <= path.length / 2 + 1 && j >= path.length / 2 - 1) {
			const startNode = turnIntoNode(path[i]);
			const endNode = turnIntoNode(path[j]);

			await sleep(150);
			drawPath(startNode.row, startNode.column);
			drawPath(endNode.row, endNode.column);
			i++;
			j--;
		}
	};

	// allows for drawing walls while dragging the mouse or dragging the start and ending point
	const handleMouseDown = (row, column) => {
		changeState(row, column);
		setMouseDown(true);
	};

	const handleMouseHover = (row, column) => {
		if (mouseDown) {
			changeState(row, column);
		}
	};

	const handleMouseUp = () => {
		if (mouseDown) {
			setMouseDown(false);
		}
	};

	return (
		<div className='App'>
			<Navbar changeCurrentChanger={changeCurrentChanger} handleSolve={handleSolve} solving={solving} />
			<div id='grid' onMouseLeave={() => setMouseDown(false)}>
				{grid?.map((row, rowIndex) =>
					row.map((state, columnIndex) => (
						<Node coordinate={{ rowIndex, columnIndex }} state={state} handleMouseDown={handleMouseDown} handleMouseHover={handleMouseHover} handleMouseUp={handleMouseUp} />
					)),
				)}
			</div>
		</div>
	);
}

export default App;
