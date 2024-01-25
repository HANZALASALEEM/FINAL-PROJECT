import React, { useEffect, useState } from "react";
import "./StudentDetailScreen.css";
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
import HifzTextMarksInput from "../../../component/hifzTextMarksInput/HifzTextMarksInput";
import { message } from "antd";
function StudentDetailScreen() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { studentData } = state;
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
	const [hifzReportData, setHifzReportData] = useState([]);
	const [hifzMarksData, setHifzMarksData] = useState([]);

	useEffect(() => {
		setRollNo(studentData.rollNo);
		setName(studentData.name);
		setFatherName(studentData.fatherName);
		setStudentCNIC(studentData.studentCNIC);
		setFatherCNIC(studentData.fatherCNIC);
		setCompletedClass(studentData.completedClass);
		setPhoneNumber1(studentData.phoneNumber1);
		setPhoneNumber2(studentData.phoneNumber2);
		setFatherEducation(studentData.fatherEducation);
		setMotherEducation(studentData.motherEducation);
		setFatherOccupation(studentData.fatherOccupation);
		setRecentClass(studentData.class);
		setFatherIncome(studentData.fatherIncome);
		setPreviousSchool(studentData.previousSchool);
		setAddress(studentData.address);

		const getHifzReport = async () => {
			const studentDocRef = doc(collection(db, "Student"), studentData.rollNo);
			const hifzReportQuery = query(
				collection(studentDocRef, "hifzReport"),
				orderBy("timestamp", "desc"),
				limit(1)
			);

			try {
				const hifzReportSnapshot = await getDocs(hifzReportQuery);

				const hifzData = [];

				hifzReportSnapshot.forEach((doc) => {
					hifzData.push({ id: doc.id, ...doc.data() });
				});

				// Assuming you want to set the state after all queries are done
				setHifzReportData(hifzData);
				console.log(hifzReportData);
			} catch (error) {
				console.error("Error fetching hifz reports:", error);
			}
		};

		getHifzReport();

		const getHifzMarks = async () => {
			const studentDocRef = doc(collection(db, "Student"), studentData.rollNo);
			const hifzReportQuery = query(
				collection(studentDocRef, "hifzMarks"),
				orderBy("timestamp", "desc"),
				limit(4)
			);

			try {
				const hifzReportSnapshot = await getDocs(hifzReportQuery);

				const hifzData = [];

				hifzReportSnapshot.forEach((doc) => {
					hifzData.push({ id: doc.id, ...doc.data() });
				});

				// Assuming you want to set the state after all queries are done
				setHifzMarksData(hifzData);
				console.log(hifzReportData);
			} catch (error) {
				console.error("Error fetching hifz reports:", error);
			}
		};

		getHifzMarks();
	}, []);

	const editRollNo = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			rollNo: rollNo,
		});
		messageApi.open({
			type: "success",
			content: "Roll No Updated in Database",
			duration: 10,
		});
	};

	const editName = async () => {
		const docRef = doc(db, "Student", studentData.id);
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
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherName: fatherName,
		});
		messageApi.open({
			type: "success",
			content: "Father Name Updated in Database",
			duration: 10,
		});
	};

	const editFatherCNIC = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherCNIC: fatherCNIC,
		});
		messageApi.open({
			type: "success",
			content: "Father CNIC Updated in Database",
			duration: 10,
		});
	};

	const editFatherEducation = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherEducation: fatherEducation,
		});
		messageApi.open({
			type: "success",
			content: "Father Education Updated in Database",
			duration: 10,
		});
	};

	const editMotherEducation = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			motherEducation: motherEducation,
		});
		messageApi.open({
			type: "success",
			content: "Mother Education Updated in Database",
			duration: 10,
		});
	};

	const editFatherIncome = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherIncome: fatherIncome,
		});
		messageApi.open({
			type: "success",
			content: "Father Income Updated in Database",
			duration: 10,
		});
	};

	const editFatherOccupation = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherOccupation: fatherOccupation,
		});
		messageApi.open({
			type: "success",
			content: "Father Occupation Updated in Database",
			duration: 10,
		});
	};

	const editStudentCNIC = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			studentCNIC: studentCNIC,
		});
		messageApi.open({
			type: "success",
			content: "Student CNIC Updated in Database",
			duration: 10,
		});
	};

	const editCompletedClass = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			completedClass: completedClass,
		});
		messageApi.open({
			type: "success",
			content: "Completed Class Updated in Database",
			duration: 10,
		});
	};

	const editPhoneNumber1 = async () => {
		const docRef = doc(db, "Student", studentData.id);
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
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			phoneNumber2: phoneNumber2,
		});
		messageApi.open({
			type: "success",
			content: "Phone Number 2 Updated in Database",
			duration: 10,
		});
	};

	const editPreviousSchool = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			previousSchool: previousSchool,
		});
		messageApi.open({
			type: "success",
			content: "Previous School Updated in Database",
			duration: 10,
		});
	};

	const editRecentClass = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			recentClass: recentClass,
		});
		messageApi.open({
			type: "success",
			content: "Recent Class Updated in Database",
			duration: 10,
		});
	};

	const editAddress = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			address: address,
		});
		messageApi.open({
			type: "success",
			content: "Address Updated in Database",
			duration: 10,
		});
	};

	const deleteButton = async () => {
		try {
			await deleteDoc(doc(db, "Student", studentData.id));
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
		<div className="studentDetailBody">
			{contextHolder}
			{/* Page Title Name */}
			<div className="studentDetailPageTitleContainer">
				<h2 className="studentDetailPageTitle">{studentData.name}</h2>
			</div>
			{/* Playground Area */}
			<div className="studentDetailPlayground">
				{/* Student Info Container */}
				<div className="studentDetailStudentInfo">
					<div className="studentDetailStudentInfoColoum">
						<TextInput
							title={"STUDENT ROLL NO: "}
							value={rollNo}
							onEdit={() => editRollNo()}
							changeText={(text) => setRollNo(text)}
						/>
						<TextInput
							title={"STUDENT NAME: "}
							value={name}
							onEdit={() => editName()}
							changeText={(text) => setName(text)}
						/>
						<TextInput
							title={"STUDENT CNIC: "}
							value={studentCNIC}
							onEdit={() => editStudentCNIC()}
							changeText={(text) => setStudentCNIC(text)}
						/>
						<TextInput
							title={"COMPLETED CLASS: "}
							value={completedClass}
							onEdit={() => editCompletedClass()}
							changeText={(text) => setCompletedClass(text)}
						/>
						<TextInput
							title={"PHONE NUMBER 1: "}
							value={phoneNumber1}
							onEdit={() => editPhoneNumber1()}
							changeText={(text) => setPhoneNumber1(text)}
						/>
					</div>
					<div className="studentDetailStudentInfoColoum">
						<TextInput
							title={"FATHER NAME: "}
							value={fatherName}
							onEdit={() => editFatherName()}
							changeText={(text) => setFatherName(text)}
						/>
						<TextInput
							title={"FATHER EDUCATION: "}
							value={fatherEducation}
							onEdit={() => editFatherEducation()}
							changeText={(text) => setFatherEducation(text)}
						/>
						<TextInput
							title={"FATHER OCCUPATION: "}
							value={fatherOccupation}
							onEdit={() => editFatherOccupation()}
							changeText={(text) => setFatherOccupation(text)}
						/>

						<TextInput
							title={"CLASS : "}
							value={recentClass}
							onEdit={() => editRecentClass()}
							changeText={(text) => setRecentClass(text)}
						/>
						<TextInput
							title={"PHONE NUMBER 2: "}
							value={phoneNumber2}
							onEdit={() => editPhoneNumber2()}
							changeText={(text) => setPhoneNumber2(text)}
						/>
					</div>
					<div className="studentDetailStudentInfoColoum">
						<TextInput
							title={"FATHER CNIC: "}
							value={fatherCNIC}
							onEdit={() => editFatherCNIC()}
							changeText={(text) => setFatherCNIC(text)}
						/>

						<TextInput
							title={"MOTHER EDUCATION: "}
							value={motherEducation}
							onEdit={() => editMotherEducation()}
							changeText={(text) => setMotherEducation(text)}
						/>
						<TextInput
							title={"FATHER INCOME: "}
							value={fatherIncome}
							onEdit={() => editFatherIncome()}
							changeText={(text) => setFatherIncome(text)}
						/>
						<TextInput
							title={"PREVIOUS SCHOOL: "}
							value={previousSchool}
							onEdit={() => editPreviousSchool()}
							changeText={(text) => setPreviousSchool(text)}
						/>
						<TextInput
							title={"ADDRESS: "}
							value={address}
							onEdit={() => editAddress()}
							changeText={(text) => setAddress(text)}
						/>
					</div>
				</div>
				{/* Hifz Report Container */}
				<div className="studentDetailhifzReport">
					<h3 className="studentDetailHeading">HIFZ REPORT</h3>
					<div className="studentDetailHifzReportContainer">
						{hifzReportData.map((report, index) => (
							<HifzTextMarksInput
								key={index}
								date={report.date}
								marks={report.marks}
							/>
						))}
					</div>
				</div>
			</div>
			{/* Delete Button */}
			<button
				className="studentDetailDeleteButton"
				onClick={() => deleteButton()}
			>
				Delete
			</button>
		</div>
	);
}
export default StudentDetailScreen;
