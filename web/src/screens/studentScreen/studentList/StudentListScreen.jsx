import React, { useEffect, useState } from "react";
import "./StudentListScreen.css";
import { Select, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
export default function StudentListScreen() {
	const navigate = useNavigate();
	const [className, setClassName] = useState("10");
	const [studentData, setStudentData] = useState([]);

	useEffect(() => {
		const getInitialStudents = async () => {
			const q = query(
				collection(db, "Student"),
				where("class", "==", className)
			);
			const querySnapshot = await getDocs(q);
			const students = [];
			querySnapshot.forEach((doc) => {
				students.push({ id: doc.id, ...doc.data() });
			});
			setStudentData(students);
		};

		getInitialStudents();
	}, [className]); // Add className to dependency array to rerun effect when it changes

	const handleClassPicker = (value) => {
		setClassName(value);
	};

	const handleStudentDetailButton = (data) => {
		// Navigate to another page and pass the data as props
		navigate("/StudentDetail", { state: { studentData: data } });
	};
	return (
		<div className="body">
			{/* Page Title Name */}
			<div className="pageTitleContainer">
				<h2 className="pageTitle">Students List</h2>
			</div>
			{/* Class Picker Container */}
			<div className="classPickerContainer">
				<p className="classTitle">CLASS: </p>
				<div>
					<Space wrap>
						<Select
							defaultValue="10"
							style={{
								width: 120,
							}}
							onChange={handleClassPicker}
							options={[
								{
									value: "Nursary",
									label: "Nursary",
								},
								{
									value: "KG",
									label: "KG",
								},
								{
									value: "1",
									label: "1",
								},
								{
									value: "2",
									label: "2",
								},
								{
									value: "3",
									label: "3",
								},
								{
									value: "4",
									label: "4",
								},
								{
									value: "5",
									label: "5",
								},
								{
									value: "6",
									label: "6",
								},
								{
									value: "7",
									label: "7",
								},
								{
									value: "8",
									label: "8",
								},
								{
									value: "9",
									label: "9",
								},
								{
									value: "10",
									label: "10",
								},
							]}
						/>
					</Space>
				</div>
			</div>
			{/* Tab Bar */}
			<div className="tabbarOutterContainer">
				<div className="tabbarInnerContainer">
					<p className="tabName">NAME</p>
					<p className="tabName">FATHER NAME</p>
					<p className="tabName">NUMBER</p>
					<p className="tabName">ADDRESS</p>
				</div>
			</div>
			{/* PlayGround of Student Details */}
			<div className="studentDetailOutterContainer">
				<div className="studentDetailInnerContainer">
					{studentData.map((data) => (
						<button
							className="studentDetailContainer"
							key={data.id}
							onClick={() => handleStudentDetailButton(data)}
						>
							<p className="tabName">{data.name}</p>
							<p className="tabName">{data.fatherName}</p>
							<p className="tabName">{data.number}</p>
							<p className="tabName">{data.address}</p>
						</button>
					))}
				</div>
			</div>
			<button className="addStudentButton">
				<img src={require("../../../assets/icons/add.png")} className="icon" />
			</button>
		</div>
	);
}
