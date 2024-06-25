import React, { useEffect, useState } from "react";
import "./FeeSubmissionDetailScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import TextInput from "../../../component/textInput/TextInput";
import { message, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function FeeSubmissionDetailScreen() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { feeData } = state;
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

	useEffect(() => {
		setName(feeData.name);
		setFatherName(feeData.fatherName);
		setRollNo(feeData.rollNo);
		setRecentClass(feeData.class);
		setDate(feeData.date);
		setMonth(feeData.month);
		setAdmissionFee(feeData.admissionFee);
		setOriginalFee(feeData.originalFee);
		setReceivedFee(feeData.receivedFee);
		setMiscFee(feeData.miscFee);
	}, []);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

	const handleDatePicker = (value) => {
		const formattedDate = value.format("DD MMMM YYYY");
		setDate(formattedDate);
	};

	const editName = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			name: name,
		});
		messageApi.open({
			type: "success",
			content: "Name Updated in Database",
			duration: 10,
		});
	};

	const editFatherName = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			fatherName: fatherName,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};
	const editClass = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			class: recentClass,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};
	const editDate = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			date: date,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const editMonth = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			month: month,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const editRollNo = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			rollNo: rollNo,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const editOriginalFee = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			originalFee: originalFee,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const editReceivedFee = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			receivedFee: receivedFee,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const editAdmissionFee = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			admissionFee: admissionFee,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const editMiscFee = async () => {
		const docRef = doc(db, "FeeSubmission", feeData.id);
		await updateDoc(docRef, {
			miscFee: miscFee,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const deleteButton = async () => {
		try {
			await deleteDoc(doc(db, "FeeSubmission", feeData.id));
			messageApi.open({
				type: "success",
				content: "Fee Deleted in Database",
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
		<div className="feeSubmissionDetailBody">
			{contextHolder}
			{/* Page Title Name */}
			<div className="feeSubmissionDetailPageTitleContainer">
				<h2 className="feeSubmissionDetailPageTitle">FEE DETAIL</h2>
			</div>
			{/* Year Picker Container */}
			<div className="feeSubmissionDetailClassPickerContainer">
				<p className="feeSubmissionDetailClassTitle">DATE: </p>
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
					className="feeSubmissionDetailEditButton"
					onClick={() => {
						editDate();
					}}
				>
					<img
						src={require("../../../assets/icons/edit-gray.png")}
						className="feeSubmissionDetailEditButtonIcon"
					/>
				</button>
			</div>
			{/* Playground Area */}
			<div className="feeSubmissionDetailPlayground">
				<div className="feeSubmissionDetailAdmissionInfo">
					<div className="feeSubmissionDetailAdmissionInfoColoum">
						<TextInput
							title={"STUDENT ROLL NO: "}
							changeText={(text) => setRollNo(text)}
							value={rollNo}
							onEdit={() => editRollNo()}
						/>
						<TextInput
							title={"MONTH: "}
							changeText={(text) => setMonth(text)}
							value={month}
							onEdit={() => editMonth()}
						/>
						<TextInput
							title={"ORIGINAL FEE: "}
							changeText={(text) => setOriginalFee(text)}
							value={originalFee}
							onEdit={() => editOriginalFee()}
						/>
					</div>
					<div className="feeSubmissionDetailAdmissionInfoColoum">
						<TextInput
							title={"STUDENT NAME: "}
							changeText={(text) => setName(text)}
							value={name}
							onEdit={() => editName()}
						/>
						<TextInput
							title={"CLASS: "}
							changeText={(text) => setRecentClass(text)}
							value={recentClass}
							onEdit={() => editClass()}
						/>
						<TextInput
							title={"RECEIVED FEE: "}
							changeText={(text) => setReceivedFee(text)}
							value={receivedFee}
							onEdit={() => editReceivedFee()}
						/>
					</div>
					<div className="feeSubmissionDetailAdmissionInfoColoum">
						<TextInput
							title={"FATHER NAME: "}
							changeText={(text) => setFatherName(text)}
							value={fatherName}
							onEdit={() => editFatherName()}
						/>
						<TextInput
							title={"ADMISSION FEE: "}
							changeText={(text) => setAdmissionFee(text)}
							value={admissionFee}
							onEdit={() => editAdmissionFee()}
						/>

						<TextInput
							title={"MISC FEE: "}
							changeText={(text) => setMiscFee(text)}
							value={miscFee}
							onEdit={() => editMiscFee()}
						/>
					</div>
				</div>
			</div>
			{/* Delete Button */}
			<button
				className="feeSubmissionDetailDeleteButton"
				onClick={() => deleteButton()}
			>
				Delete
			</button>
		</div>
	);
}

export default FeeSubmissionDetailScreen;
