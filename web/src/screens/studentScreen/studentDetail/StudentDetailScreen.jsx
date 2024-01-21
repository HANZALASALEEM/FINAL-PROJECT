import React from "react";
import "./StudentDetailScreen";
import { useLocation } from "react-router-dom";
import TextInput from "../../../component/textInput/TextInput";
function StudentDetailScreen() {
	const { state } = useLocation();
	const { studentData } = state;
	return (
		<div className="body">
			{/* Page Title Name */}
			<div className="pageTitleContainer">
				<h2 className="pageTitle">{studentData.name}</h2>
			</div>
			<TextInput title={"NAME: "} />
		</div>
	);
}

export default StudentDetailScreen;
