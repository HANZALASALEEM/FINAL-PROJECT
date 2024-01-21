import React from "react";
import "./TextInput.css";
function TextInput({ title }) {
	return (
		<div className="inputBodyContainer">
			<p className="inputTitle">{title}</p>
			<div className="inputTitleAndInputContainer">
				<input className="inputContainer" />
				<img
					src={require("../../assets/icons/edit-gray.png")}
					className="inputIcon"
				/>
			</div>
		</div>
	);
}

export default TextInput;
