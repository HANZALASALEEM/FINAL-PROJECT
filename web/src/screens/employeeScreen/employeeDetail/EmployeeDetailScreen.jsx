import React, { useEffect, useState } from "react";
import "./EmployeeDetailScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	orderBy,
	limit,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import TextInput from "../../../component/textInput/TextInput";
import { message } from "antd";

function EmployeeDetailScreen() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { employeeData } = state;
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

	useEffect(() => {
		setName(employeeData.name);
		setFatherName(employeeData.fatherName);
		setEmployeeCNIC(employeeData.employeeCNIC);
		setPhoneNumber1(employeeData.phoneNumber1);
		setPhoneNumber2(employeeData.phoneNumber2);
		setEducation(employeeData.education);
		setClassIncharge(employeeData.classIncharge);
		setPreviousJob(employeeData.previousJob);
		setPreviousSalary(employeeData.previousSalary);
		setAddress(employeeData.address);
		setDesignation(employeeData.designation);
		setSalary(employeeData.salary);
	}, []);

	const editName = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
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
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			fatherName: fatherName,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const editEmployeeCNIC = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			employeeCNIC: employeeCNIC,
		});
		messageApi.open({
			type: "success",
			content: "Employee CNIC Updated in Database",
			duration: 10,
		});
	};

	const editPhoneNumber1 = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			phoneNumber1: phoneNumber1,
		});
		messageApi.open({
			type: "success",
			content: "Phone Number 1 Updated in Database",
			duration: 10,
		});
	};

	const editPhoneNumber2 = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			phoneNumber2: phoneNumber2,
		});
		messageApi.open({
			type: "success",
			content: "Phone Number 2 Updated in Database",
			duration: 10,
		});
	};

	const editEducation = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			education: education,
		});
		messageApi.open({
			type: "success",
			content: "Education Updated in Database",
			duration: 10,
		});
	};

	const editClassIncharge = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			classIncharge: classIncharge,
		});
		messageApi.open({
			type: "success",
			content: "Class Incharge Updated in Database",
			duration: 10,
		});
	};

	const editPreviousJob = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			previousJob: previousJob,
		});
		messageApi.open({
			type: "success",
			content: "Previous Job Updated in Database",
			duration: 10,
		});
	};

	const editPreviousSalary = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			previousSalary: previousSalary,
		});
		messageApi.open({
			type: "success",
			content: "Previous Salary Updated in Database",
			duration: 10,
		});
	};

	const editAddress = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			address: address,
		});
		messageApi.open({
			type: "success",
			content: "Address Updated in Database",
			duration: 10,
		});
	};

	const editDesignation = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			designation: designation,
		});
		messageApi.open({
			type: "success",
			content: "Designation Updated in Database",
			duration: 10,
		});
	};

	const editSalary = async () => {
		const docRef = doc(db, "Employee", employeeData.id);
		await updateDoc(docRef, {
			salary: salary,
		});
		messageApi.open({
			type: "success",
			content: "Salary Updated in Database",
			duration: 10,
		});
	};

	const deleteButton = async () => {
		try {
			await deleteDoc(doc(db, "Student", employeeData.id));
			messageApi.open({
				type: "success",
				content: "Student Deleted in Database",
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
		<div className="employeeDetailBody">
			{contextHolder}
			{/* Page Title Name */}
			<div className="employeeDetailPageTitleContainer">
				<h2 className="employeeDetailPageTitle">{name}</h2>
			</div>
			{/* Playground Area */}
			<div className="employeeDetailPlayground">
				<div className="employeeDetailEmployeeInfo">
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput
							title={"EMPLOYEE NAME: "}
							value={name}
							onEdit={() => editName()}
							changeText={(text) => setName(text)}
						/>

						<TextInput
							title={"PREVIOUS JOB: "}
							value={previousJob}
							onEdit={() => editPreviousJob()}
							changeText={(text) => setPreviousJob(text)}
						/>
						<TextInput
							title={"CURRENT DESIGNATION: "}
							value={designation}
							onEdit={() => editDesignation()}
							changeText={(text) => setDesignation(text)}
						/>
						<TextInput
							title={"PHONE NUMBER 1: "}
							value={phoneNumber1}
							onEdit={() => editPhoneNumber1()}
							changeText={(text) => setPhoneNumber1(text)}
						/>
					</div>
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput
							title={"EMPLOYEE CNIC: "}
							value={employeeCNIC}
							onEdit={() => editEmployeeCNIC()}
							changeText={(text) => setEmployeeCNIC(text)}
						/>
						<TextInput
							title={"PREVIOUS JOB SALARY: "}
							value={previousSalary}
							onEdit={() => editPreviousSalary()}
							changeText={(text) => setPreviousSalary(text)}
						/>
						<TextInput
							title={"CURRENT SALARY: "}
							value={salary}
							onEdit={() => editSalary()}
							changeText={(text) => setSalary(text)}
						/>
						<TextInput
							title={"PHONE NUMBER 2: "}
							value={phoneNumber2}
							onEdit={() => editPhoneNumber2()}
							changeText={(text) => setPhoneNumber2(text)}
						/>
					</div>
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput
							title={"FATHER NAME: "}
							value={fatherName}
							onEdit={() => editFatherName()}
							changeText={(text) => setFatherName(text)}
						/>
						<TextInput
							title={"EDUCATION: "}
							value={education}
							onEdit={() => editEducation()}
							changeText={(text) => setEducation(text)}
						/>
						<TextInput
							title={"CLASS INCHARGE: "}
							value={classIncharge}
							onEdit={() => editClassIncharge()}
							changeText={(text) => setClassIncharge(text)}
						/>
						<TextInput
							title={"ADDRESS: "}
							value={address}
							onEdit={() => editAddress()}
							changeText={(text) => setAddress(text)}
						/>
					</div>
				</div>
			</div>
			{/* Delete Button */}
			<button
				className="employeeDetailDeleteButton"
				onClick={() => deleteButton()}
			>
				Delete
			</button>
		</div>
	);
}

export default EmployeeDetailScreen;
