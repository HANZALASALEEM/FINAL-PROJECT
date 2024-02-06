import React, { useState } from "react";
import TextInput from "../../../component/textInput/TextInput";
import "./NewStudentScreen.css";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { message } from "antd";
function NewStudentScreen() {
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

	// const handleSaveButton = async () => {
	// 	try {
	// 		const studentCollectionRef = collection(db, "Student");

	// 		// Use setDoc to update or create a document with a specific rollNo
	// 		await addDoc(studentCollectionRef, newStudentData);

	// 		messageApi.open({
	// 			type: "success",
	// 			content: "Student Data Saved in Database",
	// 			duration: 10,
	// 		});
	// 	} catch (error) {
	// 		console.error("Error saving document: ", error);
	// 	}
	// };

	const handleSaveButton = async () => {
		try {
			const studentCollectionRef = collection(db, "Student");

			// Use setDoc to update or create a document with a specific rollNo
			await setDoc(
				doc(studentCollectionRef, newStudentData.studentCNIC),
				newStudentData
			);

			console.log(
				"Document updated/added with rollNo: ",
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
		<div className="newStudentBody">
			{/* Page Title Name */}
			<div className="newStudentPageTitleContainer">
				<h2 className="newStudentPageTitle">ADD NEW STUDENT</h2>
			</div>
			{/* Playground Area */}
			<div className="newStudentPlayground">
				<div className="newStudentStudentInfo">
					<div className="newStudentStudentInfoColoum">
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
					<div className="newStudentStudentInfoColoum">
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
					<div className="newStudentStudentInfoColoum">
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
			<button className="newStudentSaveButton" onClick={handleSaveButton}>
				Save
			</button>
		</div>
	);
}

export default NewStudentScreen;
