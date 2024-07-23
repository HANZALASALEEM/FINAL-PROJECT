import React, { useState } from "react";
import "./NewExpenseScreen.css";
import TextInput from "../../../component/textInput/TextInput";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { message, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function NewExpenseScreen() {
	const [messageApi, contextHolder] = message.useMessage();
	const [purpose, setPurpose] = useState(null);
	const [givenAmount, setGivenAmount] = useState(0);
	const [receivedAmount, setReceivedAmount] = useState(0);
	const [date, setDate] = useState(null);
	dayjs.extend(customParseFormat);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
	const newExpenseData = {
		date: date,
		purpose: purpose,
		givenAmount: givenAmount,
		receivedAmount: receivedAmount,
	};

	const handleDatePicker = (value) => {
		const formattedDate = value.format("DD MMMM YYYY");
		setDate(formattedDate);
	};
	const handleSaveButton = async () => {
		for (let key in newExpenseData) {
			if (!newExpenseData[key]) {
				messageApi.open({
					type: "error",
					content: `All fields are required. Missing: ${key}`,
					duration: 10,
				});
				return;
			}
		}
		try {
			const expenseCollectionRef = collection(db, "Expense");

			// Use setDoc to update or create a document with a specific rollNo
			await addDoc(expenseCollectionRef, newExpenseData);

			messageApi.open({
				type: "success",
				content: "Expenses Data Saved in Database",
				duration: 10,
			});
		} catch (error) {
			console.error("Error saving document: ", error);
		}
	};

	return (
		<div className="newExpenseBody">
			{/* Page Title Name */}
			<div className="newExpensePageTitleContainer">
				<h2 className="newExpensePageTitle">ADD NEW EXPENSE</h2>
			</div>
			{/* Year Picker Container */}
			<div className="newExpenseClassPickerContainer">
				<p className="newExpenseClassTitle">DATE: </p>
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
			{/* Playground Area */}
			<div className="newExpensePlayground">
				<div className="newExpensePurposeInputOutterContainer">
					<p className="newExpensePurposeInputTitle">PURPOSE: </p>
					<div className="newExpensePurposeInputContainer">
						<input
							className="newExpensePurposeInput"
							onChange={(text) => setPurpose(text.target.value)}
						/>
						<button className="newExpensePurposeInputButton">
							<img
								src={require("../../../assets/icons/edit-gray.png")}
								className="newExpensePurposeInputIcon"
							/>
						</button>
					</div>
				</div>
				<div className="newExpenseAdmissionInfo">
					<div className="newExpenseAdmissionInfoColoum">
						<TextInput
							title={"GIVEN AMOUNT: "}
							changeText={(text) => setGivenAmount(text)}
							value={givenAmount}
						/>
					</div>
					<div className="newExpenseAdmissionInfoColoum">
						<TextInput
							title={"RECEIVED AMOUNT: "}
							changeText={(text) => setReceivedAmount(text)}
							value={receivedAmount}
						/>
					</div>
				</div>
			</div>
			{/* Save Button */}
			{contextHolder}
			<button className="newExpenseSaveButton" onClick={handleSaveButton}>
				Save
			</button>
		</div>
	);
}

export default NewExpenseScreen;
