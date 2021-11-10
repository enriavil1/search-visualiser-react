import React from "react";

function Navbar(props) {
	const handleClick = ({ target }) => {
		props.changeCurrentChanger(target.value);
	};

	return (
		<div className='navbar navbar-expand-lg navbar-light bg-light'>
			<div class='container-fluid'>
				<a className='navbar-brand'>Search Visualizer</a>
				<button id='start' className='state-changers-btn btn btn-danger btn-lg mx-5 p-2' value='start' onClick={(e) => handleClick(e)}>
					Start
				</button>
				<button id='wall' className='state-changers-btn btn btn-primary btn-lg mx-5 p-2' value='wall' onClick={(e) => handleClick(e)}>
					Wall
				</button>
				<button id='end' className='state-changers-btn btn btn-success btn-lg mx-5 p-2' value='end' onClick={(e) => handleClick(e)}>
					End
				</button>

				<button id='delete' className='state-changers-btn btn btn-secondary btn-lg mx-5 p-2' value='delete' onClick={(e) => handleClick(e)}>
					Delete
				</button>
				<button id='solve' className='state-changers-btn btn btn-warning btn-lg mx-5 p-2' value='solve' onClick={() => props.handleSolve()}>
					Solve
				</button>
			</div>
		</div>
	);
}

export default Navbar;
