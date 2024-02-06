import React, { useEffect, useState } from "react";
import "./ExpenseDetailScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import TextInput from "../../../component/textInput/TextInput";
import { message, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function ExpenseDetailScreen() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { expenseData } = state;
	const [messageApi, contextHolder] = message.useMessage();
	const [purpose, setPurpose] = useState(null);
	const [givenAmount, setGivenAmount] = useState(0);
	const [receivedAmount, setReceivedAmount] = useState(0);
	const [date, setDate] = useState(null);
	dayjs.extend(customParseFormat);

	useEffect(() => {
		setPurpose(expenseData.purpose);
		setReceivedAmount(expenseData.receivedAmount);
		setGivenAmount(expenseData.givenAmount);
	}, []);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

	const handleDatePicker = (value) => {
		setDate(value.$d);
	};

	const editDate = async () => {
		const docRef = doc(db, "Expense", expenseData.id);
		await updateDoc(docRef, {
			date: date,
		});
		messageApi.open({
			type: "success",
			content: "Date Updated in Database",
			duration: 10,
		});
	};

	const editPurpose = async () => {
		const docRef = doc(db, "Expense", expenseData.id);
		await updateDoc(docRef, {
			purpose: purpose,
		});
		messageApi.open({
			type: "success",
			content: "Purpose Updated in Database",
			duration: 10,
		});
	};

	const editGivenAmount = async () => {
		const docRef = doc(db, "Expense", expenseData.id);
		await updateDoc(docRef, {
			givenAmount: givenAmount,
		});
		messageApi.open({
			type: "success",
			content: "Given Amount Updated in Database",
			duration: 10,
		});
	};

	const editReceivedAmount = async () => {
		const docRef = doc(db, "Expense", expenseData.id);
		await updateDoc(docRef, {
			receivedAmount: receivedAmount,
		});
		messageApi.open({
			type: "success",
			content: "Received Amount Updated in Database",
			duration: 10,
		});
	};

	const deleteButton = async () => {
		try {
			await deleteDoc(doc(db, "Expense", expenseData.id));
			messageApi.open({
				type: "success",
				content: "Expense Deleted in Database",
				duration: 10,
			});

			navigate(-1);
		} catch (error) {
			console.error("Error deleting student:", error);
			messageApi.open({
				type: "error",
				content: "Check Your Internet Connection",
				duration: 10,
			});
		}
	};

	return (
		<div className="expenseDetailBody">
			{contextHolder}
			{/* Page Title Name */}
			<div className="expenseDetailPageTitleContainer">
				<h2 className="expenseDetailPageTitle">EXPENSE DETAILS</h2>
			</div>
			{/* Date Picker Container */}
			<div className="expenseDetailClassPickerContainer">
				<p className="expenseDetailClassTitle">DATE: </p>
				<div>
					<Space direction="vertical" size={12}>
						<DatePicker
							defaultValue={dayjs("01/01/2024", dateFormatList[0])}
							format={dateFormatList}
							onChange={handleDatePicker}
						/>
					</Space>
				</div>
				<button
					className="expenseDetailEditButton"
					onClick={() => {
						editDate();
					}}
				>
					<img
						src={require("../../../assets/icons/edit-gray.png")}
						className="expenseDetailEditButtonIcon"
					/>
				</button>
			</div>
			{/* Playground Area */}
			<div className="expenseDetailPlayground">
				<div className="expenseDetailPurposeInputOutterContainer">
					<p className="expenseDetailPurposeInputTitle">PURPOSE: </p>
					<div className="expenseDetailPurposeInputContainer">
						<input
							className="expenseDetailPurposeInput"
							onChange={(text) => setPurpose(text.target.value)}
							value={purpose}
						/>
						<button
							className="expenseDetailPurposeInputButton"
							onClick={() => {
								editPurpose();
							}}
						>
							<img
								src={require("../../../assets/icons/edit-gray.png")}
								className="expenseDetailPurposeInputIcon"
							/>
						</button>
					</div>
				</div>
				<div className="expenseDetailAdmissionInfo">
					<div className="expenseDetailAdmissionInfoColoum">
						<TextInput
							title={"GIVEN AMOUNT: "}
							changeText={(text) => setGivenAmount(text)}
							value={givenAmount}
							onEdit={() => {
								editGivenAmount();
							}}
						/>
					</div>
					<div className="expenseDetailAdmissionInfoColoum">
						<TextInput
							title={"RECEIVED AMOUNT: "}
							changeText={(text) => setReceivedAmount(text)}
							value={receivedAmount}
							onEdit={() => {
								editReceivedAmount();
							}}
						/>
					</div>
				</div>
			</div>
			{/* Delete Button */}
			<button
				className="expenseDetailDeleteButton"
				onClick={() => deleteButton()}
			>
				Delete
			</button>
		</div>
	);
}

export default ExpenseDetailScreen;
