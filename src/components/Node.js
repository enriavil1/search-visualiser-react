import React, { useState, useEffect } from 'react';

function Node(props) {
	const { state, setState } = useState('');

	const handleClick = () => {
		setState(props.newState());
	};

	useEffect(() => {}, state);
	return (
		<div className='node'>
			<p>{props.coordinate}</p>
		</div>
	);
}

export default Node;
