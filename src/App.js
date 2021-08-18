import './App.css';
import Node from './components/Node.js';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const GRID_ROW_LENGTH = 40;
const GRID_COLUMN_LENGTH = 40;

const buildGrid = (rowLength, columnLength) => {
	const grid = [];

	for (let i = 0; i < rowLength; i++) {
		const currentRow = [];
		for (let j = 0; j < columnLength; j++) {
			currentRow.push(<Node key={{ x: i, y: j }} />);
		}
		grid.push(currentRow);
	}
	return grid;
};

function App() {
	const [currentChanger, setCurrentChange] = useState('');
	const [startNode, setStartNode] = useState({});
	const [endNode, setEndNode] = useState({});

	const grid = buildGrid(GRID_ROW_LENGTH, GRID_COLUMN_LENGTH);

	useEffect(() => {}, [grid]);

	const changeState = () => {};

	const changeCurrentChanger = (type) => {
		setCurrentChange(type);
	};

	return (
		<div className='App'>
			<Navbar changeCurrentChanger={changeCurrentChanger} />
			<div className='grid'>{grid}</div>
		</div>
	);
}

export default App;
