import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function Navbar(props) {
	const handleClick = (value) => {
		props.changeCurrentChanger(value);
	};

	return (
		<div className='navbar navbar-expand navbar-light bg-light'>
			<div class='container'>
				<a className='navbar-brand'>Search Visualizer</a>
				<button id='start' className='navbar-button btn btn-danger btn-lg mx-5 p-2' data-bs-toggle='button' value='start' onClick={({ target }) => handleClick(target.value)}>
					Start
				</button>
				<button id='wall' className='navbar-button btn btn-primary btn-lg mx-5 p-2' data-bs-toggle='button' value='wall' onClick={({ target }) => handleClick(target.value)}>
					Wall
				</button>
				<button id='end' className='navbar-button btn btn-success btn-lg mx-5 p-2' data-bs-toggle='button' value='end' onClick={({ target }) => handleClick(target.value)}>
					End
				</button>
				<DropdownButton title={!props.solving ? "delete" : "reset"} className='navbar-button mx-5 p-2 delete' variant='secondary' size='lg' id='dropdown-basic' data-bs-toggle='button'>
					<Dropdown.Item href='#' disabled={props.solving} onClick={() => handleClick("delete")}>
						Eraser
					</Dropdown.Item>
					<Dropdown.Item href='#' onClick={() => handleClick("reset")}>
						Reset Map
					</Dropdown.Item>
					<Dropdown.Item href='#' onClick={() => handleClick("erase visited")}>
						Erase Visited
					</Dropdown.Item>
				</DropdownButton>

				<DropdownButton title='Solving Algorithm' className='mx-5 p-2' variant='warning' size='lg' id='dropdown-basic' disabled={props.solving}>
					<Dropdown.Item href='#' onClick={() => props.handleSolve("bfs")}>
						Breadth First Search
					</Dropdown.Item>
					<Dropdown.Item href='#' onClick={() => props.handleSolve("A*")}>
						A* Algorithm
					</Dropdown.Item>
				</DropdownButton>
			</div>
		</div>
	);
}

export default Navbar;
