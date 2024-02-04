import React, { useState } from "react";
import "./NewFeeSubmissionScreen.css";
import TextInput from "../../../component/textInput/TextInput";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { message, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
function NewFeeSubmissionScreen() {
	const [messageApi, contextHolder] = message.useMessage();
	const [rollNo, setRollNo] = useState(null);
	const [name, setName] = useState(null);
	const [fatherName, setFatherName] = useState(null);
	const [recentClass, setRecentClass] = useState(null);
	const [date, setDate] = useState(null);
	const [month, setMonth] = useState(null);
	const [admissionFee, setAdmissionFee] = useState(null);
	const [originalFee, setOriginalFee] = useState(null);
	const [receivedFee, setReceivedFee] = useState(null);
	const [miscFee, setMiscFee] = useState(null);
	dayjs.extend(customParseFormat);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
	const newFeeData = {
		rollNo: rollNo,
		name: name,
		fatherName: fatherName,
		class: recentClass,
		date: date,
		month: month,
		admissionFee: admissionFee,
		originalFee: originalFee,
		receivedFee: receivedFee,
		miscFee: miscFee,
	};

	const handleDatePicker = (value) => {
		setDate(value.$d);
		console.log(date);
	};
	const handleSaveButton = async () => {
		try {
			const feeCollectionRef = collection(db, "FeeSubmission");

			// Use setDoc to update or create a document with a specific rollNo
			await addDoc(feeCollectionRef, newFeeData);

			messageApi.open({
				type: "success",
				content: "Fees Data Saved in Database",
				duration: 10,
			});
		} catch (error) {
			console.error("Error saving document: ", error);
		}
	};

	return (
		<div className="newAdmissionBody">
			{/* Page Title Name */}
			<div className="newAdmissionPageTitleContainer">
				<h2 className="newAdmissionPageTitle">ADD NEW FEE</h2>
			</div>
			{/* Year Picker Container */}
			<div className="admissionListClassPickerContainer">
				<p className="admissionListClassTitle">DATE: </p>
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
			{/* Playground Area */}
			<div className="newAdmissionPlayground">
				<div className="newAdmissionAdmissionInfo">
					<div className="newAdmissionAdmissionInfoColoum">
						<TextInput
							title={"STUDENT ROLL NO: "}
							changeText={(text) => setRollNo(text)}
						/>
						<TextInput
							title={"MONTH: "}
							changeText={(text) => setMonth(text)}
						/>
						<TextInput
							title={"ORIGINAL FEE: "}
							changeText={(text) => setOriginalFee(text)}
						/>
					</div>
					<div className="newAdmissionAdmissionInfoColoum">
						<TextInput
							title={"STUDENT NAME: "}
							changeText={(text) => setName(text)}
						/>
						<TextInput
							title={"CLASS: "}
							changeText={(text) => setRecentClass(text)}
						/>
						<TextInput
							title={"RECEIVED FEE: "}
							changeText={(text) => setReceivedFee(text)}
						/>
					</div>
					<div className="newAdmissionAdmissionInfoColoum">
						<TextInput
							title={"FATHER NAME: "}
							changeText={(text) => setFatherName(text)}
						/>
						<TextInput
							title={"ADMISSION FEE: "}
							changeText={(text) => setAdmissionFee(text)}
						/>

						<TextInput
							title={"MISC FEE: "}
							changeText={(text) => setMiscFee(text)}
						/>
					</div>
				</div>
			</div>
			{/* Save Button */}
			{contextHolder}
			<button className="newAdmissionSaveButton" onClick={handleSaveButton}>
				Save
			</button>
		</div>
	);
}

export default NewFeeSubmissionScreen;
