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
	const [totalAmounts, setTotalAmounts] = useState({
		totalAdmissionFee: 0,
		totalOriginalFee: 0,
		totalReceivedFee: 0,
		totalMiscFee: 0,
	});

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

	useEffect(() => {
		const getInitialFees = async () => {
			const q = query(
				collection(db, "FeeSubmission"),
				where("date", "==", date)
			);
			const querySnapshot = await getDocs(q);
			const fees = [];
			let totalAdmissionFee = 0;
			let totalOriginalFee = 0;
			let totalReceivedFee = 0;
			let totalMiscFee = 0;
			querySnapshot.forEach((doc) => {
				const data = { id: doc.id, ...doc.data() };
				fees.push(data);
				totalAdmissionFee += parseFloat(data.admissionFee) || 0;
				totalOriginalFee += parseFloat(data.originalFee) || 0;
				totalReceivedFee += parseFloat(data.receivedFee) || 0;
				totalMiscFee += parseFloat(data.miscFee) || 0;
			});
			setFeeData(fees);
			setTotalAmounts({
				totalAdmissionFee,
				totalOriginalFee,
				totalReceivedFee,
				totalMiscFee,
			});
		};

		getInitialFees();
	}, [date]); // Add className to dependency array to rerun effect when it changes

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
							defaultValue={dayjs("01/01/2024", dateFormatList[0])}
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
					<p className="feeSubmissionListTabName">MISC FEE</p>
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
							<p className="feeSubmissionListTabName">{data.miscFee}</p>
						</button>
					))}
				</div>
			</div>
			<div className="feeSubmissionListTotalCountOutterContainer">
				<div className="feeSubmissionListTotalCountInnerContainer">
					<div className="feeSubmissionListTotalCountEachContainer">
						<p className="feeSubmissionListTotalCountEachContainerTitle">
							TOTAL ADMISSION FEE:
						</p>
						<p className="feeSubmissionListTotalCountEachContainerAmount">
							{totalAmounts.totalAdmissionFee}
						</p>
					</div>
					<div className="feeSubmissionListTotalCountEachContainer">
						<p className="feeSubmissionListTotalCountEachContainerTitle">
							TOTAL ORIGINAL FEE:
						</p>
						<p className="feeSubmissionListTotalCountEachContainerAmount">
							{totalAmounts.totalOriginalFee}
						</p>
					</div>
					<div className="feeSubmissionListTotalCountEachContainer">
						<p className="feeSubmissionListTotalCountEachContainerTitle">
							TOTAL RECEIVED FEE:
						</p>
						<p className="feeSubmissionListTotalCountEachContainerAmount">
							{totalAmounts.totalReceivedFee}
						</p>
					</div>
					<div className="feeSubmissionListTotalCountEachContainer">
						<p className="feeSubmissionListTotalCountEachContainerTitle">
							TOTAL MISC FEE:
						</p>
						<p className="feeSubmissionListTotalCountEachContainerAmount">
							{totalAmounts.totalMiscFee}
						</p>
					</div>
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
