import "./App.css";
import Node from "./components/Node.js";
import { useState, useEffect, Fragment } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { makeConnections } from "./functions/connections";
import { bfs } from "./functions/bfsSolve";

function App() {
	const NUM_OF_ROWS = 30;
	const NUM_OF_COLUMNS = 45;
	const [currentChanger, setCurrentChange] = useState("");
	const [startNode, setStartNode] = useState({ row: null, column: null });
	const [endNode, setEndNode] = useState({ row: null, column: null });
	const [grid, setGrid] = useState([]);
	const [mouseDown, setMouseDown] = useState(false);

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

	const changeCurrentChanger = (activeButton) => {
		if (currentChanger !== "") {
			document.getElementById(currentChanger).classList.remove("active");
		}
		if (activeButton !== "") {
			document.getElementById(activeButton).classList.add("active");
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
		let newGrid = [...grid];
		let node = { row: row, column: column };

		if (node !== startNode && node !== endNode)
			newGrid[row][column] = "visited";
		setGrid(newGrid);
	};

	const drawPath = (row, column) => {
		let newGrid = [...grid];
		let node = { row: row, column: column };

		if (node !== startNode && node !== endNode) newGrid[row][column] = "path";
		setGrid(newGrid);
	};

	const handleSolve = () => {
		const connections = makeConnections(grid);

		const [path, visited] = bfs(connections, startNode, endNode);
		console.log(path);
		console.log(visited);

		for (let node of visited) {
			let split = node.trim().split(",");
			let row = Number(split[0]);
			let column = Number(split[1]);

			drawVisited(row, column);
		}

		for (let node of path) {
			let split = node.trim().split(",");
			let row = Number(split[0]);
			let column = Number(split[1]);
			drawPath(row, column);
		}
	};

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
			<Navbar
				changeCurrentChanger={changeCurrentChanger}
				handleSolve={handleSolve}
			/>
			<div id='grid' onMouseLeave={() => setMouseDown(false)}>
				{grid?.map((row, rowIndex) =>
					row.map((state, columnIndex) => (
						<Node
							coordinate={{ rowIndex, columnIndex }}
							state={state}
							handleMouseDown={handleMouseDown}
							handleMouseHover={handleMouseHover}
							handleMouseUp={handleMouseUp}
						/>
					)),
				)}
			</div>
		</div>
	);
}

export default App;
