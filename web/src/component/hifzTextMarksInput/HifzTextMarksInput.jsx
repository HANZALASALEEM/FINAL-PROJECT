import React from "react";
import "./HifzTextMarksInput.css";
function HifzTextMarksInput({ date, marks }) {
	return (
		<div className="hifzInputMarksBodyContainer">
			<p className="hifzInputMarksDate">DATE: {date}</p>
			<div className="hifzInputMarksTitleAndInputContainer">
				<p className="hifzInputMarksDate">{marks}</p>
				<p className="hifzInputMarksDate">/</p>
				<p className="hifzInputMarksDate">25</p>
			</div>
		</div>
	);
}

export default HifzTextMarksInput;
