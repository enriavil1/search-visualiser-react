import "./App.css";
import Node from "./components/Node.js";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
	const [currentChanger, setCurrentChange] = useState("");
	const [windowSize, setWindowSize] = useState({
		row: Math.floor(window.innerHeight / 40),
		column: Math.floor(window.innerWidth / 40),
	});
	const [startNode, setStartNode] = useState({ row: null, column: null });
	const [endNode, setEndNode] = useState({ row: null, column: null });
	const [grid, setGrid] = useState([]);

	useEffect(() => {
		window.onresize = handleWindowResize;
		setGrid(buildGrid(windowSize.row, windowSize.column));
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

	const handleWindowResize = () => {
		setWindowSize({
			row: Math.floor(window.innerHeight / 40),
			column: Math.floor(window.innerWidth / 40),
		});
	};

	const changeCurrentChanger = (type) => {
		setCurrentChange(type);
	};

	const changeState = (row, column) => {
		const node = { row: row, column: column };

		let newGrid = grid;

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
			if (endNode.row) {
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

		setGrid(newGrid);

		console.log(grid);
		console.log(startNode);
	};

	return (
		<div className='App'>
			<Navbar changeCurrentChanger={changeCurrentChanger} />
			<div className='grid'>
				{grid?.map((row, rowIndex) =>
					row.map((state, columnIndex) => (
						<Node
							coordinate={{ rowIndex, columnIndex }}
							state={state}
							changeState={changeState}
						/>
					)),
				)}
			</div>
		</div>
	);
}

export default App;
