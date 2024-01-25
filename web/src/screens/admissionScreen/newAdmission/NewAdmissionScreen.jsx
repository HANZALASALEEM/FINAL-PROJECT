import React, { useState } from "react";
import TextInput from "../../../component/textInput/TextInput";
import "./NewAdmissionScreen.css";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { message, Select, Space } from "antd";
function NewAdmissionScreen() {
	const [messageApi, contextHolder] = message.useMessage();
	const [rollNo, setRollNo] = useState(null);
	const [name, setName] = useState(null);
	const [fatherName, setFatherName] = useState(null);
	const [studentCNIC, setStudentCNIC] = useState(null);
	const [fatherCNIC, setFatherCNIC] = useState(null);
	const [completedClass, setCompletedClass] = useState(null);
	const [phoneNumber1, setPhoneNumber1] = useState(null);
	const [phoneNumber2, setPhoneNumber2] = useState(null);
	const [fatherEducation, setFatherEducation] = useState(null);
	const [motherEducation, setMotherEducation] = useState(null);
	const [fatherOccupation, setFatherOccupation] = useState(null);
	const [recentClass, setRecentClass] = useState(null);
	const [fatherIncome, setFatherIncome] = useState(null);
	const [previousSchool, setPreviousSchool] = useState(null);
	const [address, setAddress] = useState(null);
	const [year, setYear] = useState(null);

	const newStudentData = {
		rollNo: rollNo,
		name: name,
		fatherName: fatherName,
		studentCNIC: studentCNIC,
		fatherCNIC: fatherCNIC,
		completedClass: completedClass,
		phoneNumber1: phoneNumber1,
		phoneNumber2: phoneNumber2,
		fatherEducation: fatherEducation,
		motherEducation: motherEducation,
		fatherOccupation: fatherOccupation,
		class: recentClass,
		fatherIncome: fatherIncome,
		previousSchool: previousSchool,
		address: address,
	};

	const newAdmissionData = {
		name: name,
		fatherName: fatherName,
		phoneNumber1: phoneNumber1,
		class: recentClass,
		address: address,
		year: year,
	};

	const handleYearPicker = (value) => {
		setYear(value);
	};

	const handleSaveButton = async () => {
		try {
			const studentCollectionRef = collection(db, "Student");
			const admissionCollectionRef = collection(db, "Admission");

			// Use setDoc to update or create a document with a specific rollNo
			await setDoc(
				doc(studentCollectionRef, newStudentData.studentCNIC),
				newStudentData
			);
			await setDoc(
				doc(admissionCollectionRef, newAdmissionData.phoneNumber1),
				newAdmissionData
			);

			console.log(
				"Document updated/added with CNIC: ",
				newStudentData.studentCNIC
			);
			messageApi.open({
				type: "success",
				content: "Student Data Saved in Database",
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
				<h2 className="newAdmissionPageTitle">ADD NEW ADMISSION</h2>
			</div>
			{/* Year Picker Container */}
			<div className="admissionListClassPickerContainer">
				<p className="admissionListClassTitle">YEAR: </p>
				<div>
					<Space wrap>
						<Select
							defaultValue="2024"
							style={{
								width: 120,
							}}
							onChange={handleYearPicker}
							options={[
								{
									value: "2024",
									label: "2024",
								},
								{
									value: "2025",
									label: "2025",
								},
								{
									value: "2026",
									label: "2026",
								},
								{
									value: "2027",
									label: "2027",
								},
								{
									value: "2028",
									label: "2028",
								},
								{
									value: "2029",
									label: "2029",
								},
								{
									value: "2030",
									label: "2030",
								},
							]}
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
							title={"STUDENT NAME: "}
							changeText={(text) => setName(text)}
						/>
						<TextInput
							title={"STUDENT CNIC: "}
							changeText={(text) => setStudentCNIC(text)}
						/>
						<TextInput
							title={"COMPLETED CLASS: "}
							changeText={(text) => setCompletedClass(text)}
						/>
						<TextInput
							title={"PHONE NUMBER 1: "}
							changeText={(text) => setPhoneNumber1(text)}
						/>
					</div>
					<div className="newAdmissionAdmissionInfoColoum">
						<TextInput
							title={"FATHER NAME: "}
							changeText={(text) => setFatherName(text)}
						/>
						<TextInput
							title={"FATHER EDUCATION: "}
							changeText={(text) => setFatherEducation(text)}
						/>
						<TextInput
							title={"FATHER OCCUPATION: "}
							changeText={(text) => setFatherOccupation(text)}
						/>

						<TextInput
							title={"CLASS : "}
							changeText={(text) => setRecentClass(text)}
						/>
						<TextInput
							title={"PHONE NUMBER 2: "}
							changeText={(text) => setPhoneNumber2(text)}
						/>
					</div>
					<div className="newAdmissionAdmissionInfoColoum">
						<TextInput
							title={"FATHER CNIC: "}
							changeText={(text) => setFatherCNIC(text)}
						/>

						<TextInput
							title={"MOTHER EDUCATION: "}
							changeText={(text) => setMotherEducation(text)}
						/>
						<TextInput
							title={"FATHER INCOME: "}
							changeText={(text) => setFatherIncome(text)}
						/>
						<TextInput
							title={"PREVIOUS SCHOOL: "}
							changeText={(text) => setPreviousSchool(text)}
						/>
						<TextInput
							title={"ADDRESS: "}
							changeText={(text) => setAddress(text)}
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

export default NewAdmissionScreen;
