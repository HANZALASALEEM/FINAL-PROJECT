import React, { useState, useEffect } from "react";
import "./ExpenseListScreen.css";
import { DatePicker, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function ExpenseListScreen() {
	const navigate = useNavigate();
	const [date, setDate] = useState(null);
	const [expenseData, setExpenseData] = useState([]);
	dayjs.extend(customParseFormat);
	const [totalAmounts, setTotalAmounts] = useState({
		totalGivenAmount: 0,
		totalReceivedAmount: 0,
	});

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

	useEffect(() => {
		const getInitialExpenses = async () => {
			const q = query(collection(db, "Expense"), where("date", "==", date));
			const querySnapshot = await getDocs(q);
			const expenses = [];
			let totalGivenAmount = 0;
			let totalReceivedAmount = 0;

			querySnapshot.forEach((doc) => {
				const data = { id: doc.id, ...doc.data() };
				expenses.push(data);
				totalGivenAmount += parseFloat(data.givenAmount) || 0;
				totalReceivedAmount += parseFloat(data.receivedAmount) || 0;
			});
			setExpenseData(expenses);
			setTotalAmounts({
				totalGivenAmount,
				totalReceivedAmount,
			});
		};

		getInitialExpenses();
	}, [date]); // Add className to dependency array to rerun effect when it changes

	const handleDatePicker = (value) => {
		const formattedDate = value.format("DD MMMM YYYY");
		setDate(formattedDate);
	};

	const handleExpenseDetailButton = (data) => {
		// Navigate to another page and pass the data as props
		navigate("/ExpenseDetail", { state: { expenseData: data } });
	};

	const handleNewExpenseButton = () => {
		// Navigate to another page and pass the data as props
		navigate("/NewExpense");
	};

	return (
		<div className="expenseListBody">
			{/* Page Title Name */}
			<div className="expenseListPageTitleContainer">
				<h2 className="expenseListPageTitle">EXPENSES LIST</h2>
			</div>
			{/* Class Picker Container */}
			<div className="expenseListClassPickerContainer">
				<p className="expenseListClassTitle">DATE: </p>
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
			<div className="expenseListTabbarOutterContainer">
				<div className="expenseListTabbarInnerContainer">
					<p className="expenseListTabNameSerialNo">Sr.No</p>
					<p className="expenseListTabNamePurpose">PURPOSE</p>
					<p className="expenseListTabName">GIVEN AMOUNT</p>
					<p className="expenseListTabName">RECEIVED AMOUNT</p>
				</div>
			</div>
			{/* PlayGround of feeSubmission Details */}
			<div className="expenseListFeeSubmissionDetailOutterContainer">
				<div className="expenseListFeeSubmissionDetailInnerContainer">
					{expenseData.map((data) => (
						<button
							className="expenseListFeeSubmissionDetailContainer"
							key={data.id}
							onClick={() => handleExpenseDetailButton(data)}
						>
							<p className="expenseListTabNameSerialNo">{data.serialNo}</p>
							<p className="expenseListTabNamePurpose">{data.purpose}</p>
							<p className="expenseListTabName">{data.givenAmount}</p>
							<p className="expenseListTabName">{data.receivedAmount}</p>
						</button>
					))}
				</div>
			</div>
			<div className="expenseListTotalCountOutterContainer">
				<div className="expenseListTotalCountInnerContainer">
					<div className="expenseListTotalCountEachContainer">
						<p className="expenseListTotalCountEachContainerTitle">
							TOTAL GIVEN AMOUNT:
						</p>
						<p className="expenseListTotalCountEachContainerAmount">
							{totalAmounts.totalGivenAmount}
						</p>
					</div>
					<div className="expenseListTotalCountEachContainer">
						<p className="expenseListTotalCountEachContainerTitle">
							TOTAL RECEIVED AMOUNT:
						</p>
						<p className="expenseListTotalCountEachContainerAmount">
							{totalAmounts.totalReceivedAmount}
						</p>
					</div>
				</div>
			</div>
			<button
				className="expenseListAddFeeSubmissionButton"
				onClick={() => handleNewExpenseButton()}
			>
				<img
					src={require("../../../assets/icons/add.png")}
					className="expenseListIcon"
				/>
			</button>
		</div>
	);
}

export default ExpenseListScreen;
