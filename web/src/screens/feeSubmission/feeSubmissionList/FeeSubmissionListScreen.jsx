import React, { useState, useEffect } from "react";
import "./FeeSubmissionListScreen.css";
import { DatePicker, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
function FeeSubmissionListScreen() {
	const navigate = useNavigate();
	const [date, setDate] = useState(null);
	const [feeData, setFeeData] = useState([]);
	dayjs.extend(customParseFormat);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

	// useEffect(() => {
	// 	const getInitialFees = async () => {
	// 		const q = query(
	// 			collection(db, "FeeSubmission"),
	// 			where("date", "==", date)
	// 		);
	// 		const querySnapshot = await getDocs(q);
	// 		const fees = [];
	// 		querySnapshot.forEach((doc) => {
	// 			fees.push({ id: doc.id, ...doc.data() });
	// 		});
	// 		setFeeData(fees);
	// 	};

	// 	getInitialFees();
	// }, [date]); // Add className to dependency array to rerun effect when it changes

	const handleDatePicker = (value) => {
		setDate(value.$d);
		console.log(date);
	};

	const handleNewFeeButton = () => {
		// Navigate to another page and pass the data as props
		navigate("/NewFeeSubmission");
	};
	return (
		<div className="feeSubmissionListBody">
			{/* Page Title Name */}
			<div className="feeSubmissionListPageTitleContainer">
				<h2 className="feeSubmissionListPageTitle">Fee Submission List</h2>
			</div>
			{/* Class Picker Container */}
			<div className="feeSubmissionListClassPickerContainer">
				<p className="feeSubmissionListClassTitle">DATE: </p>
				<div>
					<Space direction="vertical" size={12}>
						<DatePicker
							defaultValue={dayjs("01/01/2015", dateFormatList[0])}
							format={dateFormatList}
							onChange={handleDatePicker}
						/>
					</Space>
				</div>
			</div>
			{/* Tab Bar */}
			<div className="feeSubmissionListTabbarOutterContainer">
				<div className="feeSubmissionListTabbarInnerContainer">
					<p className="feeSubmissionListTabName">ROLL NO</p>
					<p className="feeSubmissionListTabName">NAME</p>
					<p className="feeSubmissionListTabName">CLASS</p>
					<p className="feeSubmissionListTabName">MONTH</p>
					<p className="feeSubmissionListTabName">ADMISSION FEE</p>
					<p className="feeSubmissionListTabName">ORIGINAL FEE</p>
					<p className="feeSubmissionListTabName">RECEIVED FEE</p>
				</div>
			</div>
			{/* PlayGround of feeSubmission Details */}
			<div className="feeSubmissionListFeeSubmissionDetailOutterContainer">
				<div className="feeSubmissionListFeeSubmissionDetailInnerContainer">
					{feeData.map((data) => (
						<button
							className="feeSubmissionListFeeSubmissionDetailContainer"
							key={data.id}
						>
							<p className="feeSubmissionListTabName">{data.rollNo}</p>
							<p className="feeSubmissionListTabName">{data.name}</p>
							<p className="feeSubmissionListTabName">{data.class}</p>
							<p className="feeSubmissionListTabName">{data.month}</p>
							<p className="feeSubmissionListTabName">{data.admissionFee}</p>
							<p className="feeSubmissionListTabName">{data.originalFee}</p>
							<p className="feeSubmissionListTabName">{data.receivedFee}</p>
						</button>
					))}
				</div>
			</div>
			<button
				className="feeSubmissionListAddFeeSubmissionButton"
				onClick={() => handleNewFeeButton()}
			>
				<img
					src={require("../../../assets/icons/add.png")}
					className="feeSubmissionListIcon"
				/>
			</button>
		</div>
	);
}

export default FeeSubmissionListScreen;
