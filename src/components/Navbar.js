import React from "react";

function Navbar(props) {
	const handleClick = ({ target }) => {
		props.changeCurrentChanger(target.value);
	};

	return (
		<div className='navbar navbar-expand-lg bg-dark'>
			<div class='container-fluid'>
				<a className='navbar-brand'>Search Visualizer</a>
				<button
					id='start'
					className='state-changers-btn btn btn-danger btn-sm'
					value='start'
					onClick={(e) => handleClick(e)}
				>
					Start
				</button>
				<button
					id='wall'
					className='state-changers-btn btn btn-primary btn-sm'
					value='wall'
					onClick={(e) => handleClick(e)}
				>
					Wall
				</button>
				<button
					id='end'
					className='state-changers-btn btn btn-success btn-sm'
					value='end'
					onClick={(e) => handleClick(e)}
				>
					End
				</button>

				<button
					id='delete'
					className='state-changers-btn btn btn-secondary btn-sm'
					value='delete'
					onClick={(e) => handleClick(e)}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default Navbar;
