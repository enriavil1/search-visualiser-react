import React from "react";

function Node(props) {
	const handleClick = () => {
		props.changeState(props.coordinate.rowIndex, props.coordinate.columnIndex);
	};

	return (
		<div className={"node " + props.state} onClick={() => handleClick()}></div>
	);
}

export default Node;
