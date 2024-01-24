import React, { useEffect, useState } from "react";
import "./StudentDetailScreen.css";
import { useLocation } from "react-router-dom";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import TextInput from "../../../component/textInput/TextInput";
import HifzTextMarksInput from "../../../component/hifzTextMarksInput/HifzTextMarksInput";
function StudentDetailScreen() {
	const { state } = useLocation();
	const { studentData } = state;
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
	}, []);

	// useEffect(() => {
	// 	const getInitialStudents = async () => {
	// 		const studentQuery = query(
	// 			collection(db, "Student"),
	// 			where("name", "==", studentData.name),
	// 			where("rollNo", "==", studentData.rollNo)
	// 		);

	// 		const studentSnapshot = await getDocs(studentQuery);

	// 		const students = [];

	// 		studentSnapshot.forEach(async (studentDoc) => {
	// 			// Assuming 'hifzReport' is a subcollection inside each student document
	// 			const hifzReportQuery = query(
	// 				collection(db, "Student", studentDoc.id, "hifzReport"),
	// 				orderBy("timestamp", "desc"), // Order by timestamp in descending order
	// 				limit(1) // Limit the results to 1 to get the most recent document
	// 			);

	// 			const hifzReportSnapshot = await getDocs(hifzReportQuery);

	// 			hifzReportSnapshot.forEach((hifzReportDoc) => {
	// 				students.push({
	// 					id: studentDoc.id,
	// 					studentData: studentDoc.data(),
	// 					hifzReport: { id: hifzReportDoc.id, ...hifzReportDoc.data() },
	// 				});
	// 			});

	// 			// Assuming you want to set the state after all queries are done
	// 			setStudentData(students);
	// 		});
	// 	};

	// 	getInitialStudents();
	// }, []);

	const editRollNo = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			rollNo: rollNo,
		});
	};

	const editName = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			name: name,
		});
	};

	const editFatherName = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherName: fatherName,
		});
	};

	const editFatherCNIC = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherCNIC: fatherCNIC,
		});
	};

	const editFatherEducation = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherEducation: fatherEducation,
		});
	};

	const editMotherEducation = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			motherEducation: motherEducation,
		});
	};

	const editFatherIncome = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherIncome: fatherIncome,
		});
	};

	const editFatherOccupation = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			fatherOccupation: fatherOccupation,
		});
	};

	const editStudentCNIC = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			studentCNIC: studentCNIC,
		});
	};

	const editCompletedClass = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			completedClass: completedClass,
		});
	};

	const editPhoneNumber1 = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			phoneNumber1: phoneNumber1,
		});
	};

	const editPhoneNumber2 = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			phoneNumber2: phoneNumber2,
		});
	};

	const editPreviousSchool = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			previousSchool: previousSchool,
		});
	};

	const editRecentClass = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			recentClass: recentClass,
		});
	};

	const editAddress = async () => {
		const docRef = doc(db, "Student", studentData.id);
		await updateDoc(docRef, {
			address: address,
		});
	};

	const deleteButton = async () => {
		await deleteDoc(doc(db, "Student", studentData.id));
	};

	return (
		<div className="studentDetailBody">
			{/* Page Title Name */}
			<div className="studentDetailPageTitleContainer">
				<h2 className="studentDetailPageTitle">{studentData.name}</h2>
			</div>
			{/* Playground Area */}
			<div className="studentDetailPlayground">
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
				<div className="studentDetailhifzReport">
					<h3 className="studentDetailHeading">HIFZ REPORT</h3>
					<div>
						<HifzTextMarksInput />
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
