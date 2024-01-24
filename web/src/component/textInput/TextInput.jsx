import React from "react";
import "./TextInput.css";
function TextInput({ title, placeholder, value, changeText, onEdit }) {
	return (
		<div className="inputBodyContainer">
			<p className="inputTitle">{title}</p>
			<div className="inputTitleAndInputContainer">
				<input
					className="inputContainer"
					placeholder={placeholder}
					value={value}
					onChange={(text) => changeText(text.target.value)}
				/>
				<button className="inputButton" onClick={() => onEdit()}>
					<img
						src={require("../../assets/icons/edit-gray.png")}
						className="inputIcon"
					/>
				</button>
			</div>
		</div>
	);
}

export default TextInput;
