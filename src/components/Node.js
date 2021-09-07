import React from "react";

function Node(props) {
	return (
		<div
			className={"node " + props.state}
			onMouseDown={() =>
				props.handleMouseDown(
					props.coordinate.rowIndex,
					props.coordinate.columnIndex,
				)
			}
			onMouseOver={() =>
				props.handleMouseHover(
					props.coordinate.rowIndex,
					props.coordinate.columnIndex,
				)
			}
			onMouseUp={() => props.handleMouseUp()}
		></div>
	);
}

export default Node;
