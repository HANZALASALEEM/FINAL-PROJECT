import React from "react";

const ContextState = (props) => {
	return <ContextState.Provider>{props.children}</ContextState.Provider>;
};

export default ContextState;
