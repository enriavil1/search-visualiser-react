import React from "react";

function Navbar(props) {
	const handleClick = ({ target }) => {
		props.changeCurrentChanger(target.value);
	};

	return (
		<div className='navbar'>
			<div className='state-changers-btn-container'>
				<button
					className='state-changers-btn'
					value='wall'
					onClick={(e) => handleClick(e)}
				>
					Wall
				</button>
				<button
					className='state-changers-btn'
					value='start'
					onClick={(e) => handleClick(e)}
				>
					Start
				</button>
				<button
					className='state-changers-btn'
					value='end'
					onClick={(e) => handleClick(e)}
				>
					End
				</button>
			</div>
		</div>
	);
}

export default Navbar;
