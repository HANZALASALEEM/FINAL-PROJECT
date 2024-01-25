import React, { useState, useEffect } from "react";
import "./NewEmployeeScreen.css";
import TextInput from "../../../component/textInput/TextInput";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { message } from "antd";
function NewEmployeeScreen() {
	const [messageApi, contextHolder] = message.useMessage();
	const [name, setName] = useState(null);
	const [fatherName, setFatherName] = useState(null);
	const [employeeCNIC, setEmployeeCNIC] = useState(null);
	const [phoneNumber1, setPhoneNumber1] = useState(null);
	const [phoneNumber2, setPhoneNumber2] = useState(null);
	const [education, setEducation] = useState(null);
	const [classIncharge, setClassIncharge] = useState(null);
	const [previousJob, setPreviousJob] = useState(null);
	const [previousSalary, setPreviousSalary] = useState(null);
	const [address, setAddress] = useState(null);
	const [designation, setDesignation] = useState(null);
	const [salary, setSalary] = useState(null);

	const newEmployeeData = {
		name: name,
		fatherName: fatherName,
		employeeCNIC: employeeCNIC,
		classIncharge: classIncharge,
		phoneNumber1: phoneNumber1,
		phoneNumber2: phoneNumber2,
		education: education,
		previousJob: previousJob,
		previousSalary: previousSalary,
		designation: designation,
		salary: salary,
		address: address,
	};

	const handleSaveButton = async () => {
		try {
			const employeeCollectionRef = collection(db, "Employee");

			// Use setDoc to update or create a document with a specific rollNo
			await setDoc(
				doc(employeeCollectionRef, newEmployeeData.employeeCNIC),
				newEmployeeData
			);

			console.log(
				"Document updated/added with CNIC: ",
				newEmployeeData.employeeCNIC
			);
			messageApi.open({
				type: "success",
				content: "Employee Data Saved in Database",
				duration: 10,
			});
		} catch (error) {
			console.error("Error saving document: ", error);
		}
	};
	return (
		<div className="newEmployeeBody">
			{/* Page Title Name */}
			<div className="newEmployeePageTitleContainer">
				<h2 className="newEmployeePageTitle">ADD NEW EMPLOYEE</h2>
			</div>
			{/* Playground Area */}
			<div className="newEmployeePlayground">
				<div className="newEmployeeEmployeeInfo">
					<div className="newEmployeeEmployeeInfoColoum">
						<TextInput
							title={"EMPLOYEE NAME: "}
							changeText={(text) => setName(text)}
						/>

						<TextInput
							title={"PREVIOUS JOB: "}
							changeText={(text) => setPreviousJob(text)}
						/>
						<TextInput
							title={"CURRENT DESIGNATION: "}
							changeText={(text) => setDesignation(text)}
						/>
						<TextInput
							title={"PHONE NUMBER 1: "}
							changeText={(text) => setPhoneNumber1(text)}
						/>
					</div>
					<div className="newEmployeeEmployeeInfoColoum">
						<TextInput
							title={"EMPLOYEE CNIC: "}
							changeText={(text) => setEmployeeCNIC(text)}
						/>
						<TextInput
							title={"PREVIOUS JOB SALARY: "}
							changeText={(text) => setPreviousSalary(text)}
						/>
						<TextInput
							title={"CURRENT SALARY: "}
							changeText={(text) => setSalary(text)}
						/>
						<TextInput
							title={"PHONE NUMBER 2: "}
							changeText={(text) => setPhoneNumber2(text)}
						/>
					</div>
					<div className="newEmployeeEmployeeInfoColoum">
						<TextInput
							title={"FATHER NAME: "}
							changeText={(text) => setFatherName(text)}
						/>
						<TextInput
							title={"EDUCATION: "}
							changeText={(text) => setEducation(text)}
						/>
						<TextInput
							title={"CLASS INCHARGE: "}
							changeText={(text) => setClassIncharge(text)}
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
			<button className="newEmployeeSaveButton" onClick={handleSaveButton}>
				Save
			</button>
		</div>
	);
}

export default NewEmployeeScreen;
