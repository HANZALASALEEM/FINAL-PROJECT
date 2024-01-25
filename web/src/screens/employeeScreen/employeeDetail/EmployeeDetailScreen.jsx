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

	return (
		<div className="employeeDetailBody">
			{/* Page Title Name */}
			<div className="employeeDetailPageTitleContainer">
				<h2 className="employeeDetailPageTitle">{employeeData.name}</h2>
			</div>
			{/* Playground Area */}
			<div className="employeeDetailPlayground">
				<div className="employeeDetailEmployeeInfo">
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput title={"EMPLOYEE NAME: "} value={employeeData.name} />

						<TextInput
							title={"PREVIOUS JOB: "}
							value={employeeData.completedClass}
						/>
						<TextInput
							title={"CURRENT DESIGNATION: "}
							value={employeeData.completedClass}
						/>
						<TextInput
							title={"PHONE NUMBER 1: "}
							value={employeeData.phoneNumber1}
						/>
					</div>
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput
							title={"EMPLOYEE CNIC: "}
							value={employeeData.studentCNIC}
						/>
						<TextInput
							title={"PREVIOUS JOB SALARY: "}
							value={employeeData.completedClass}
						/>
						<TextInput
							title={"CURRENT SALARY: "}
							value={employeeData.completedClass}
						/>
						<TextInput
							title={"PHONE NUMBER 2: "}
							value={employeeData.phoneNumber2}
						/>
					</div>
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput
							title={"FATHER NAME: "}
							value={employeeData.fatherName}
						/>
						<TextInput
							title={"EDUCATION: "}
							value={employeeData.fatherOccupation}
						/>
						<TextInput
							title={"CLASS INCHARGE: "}
							value={employeeData.motherEducation}
						/>
						<TextInput title={"ADDRESS: "} value={employeeData.address} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeeDetailScreen;
