import React, { useEffect, useState, useRef } from "react";
import "./StudentListScreen.css";
import { Select, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function StudentListScreen() {
	const pdfRef = useRef();
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

	const handleNewStudentButton = () => {
		// Navigate to another page and pass the data as props
		navigate("/NewStudent");
	};

	const handlePdfGenerator = () => {
		const input = pdfRef.current;

		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4", true);

			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const ratio = pdfWidth / imgWidth;

			const scaledImgHeight = imgHeight * ratio;
			const totalPages = Math.ceil(scaledImgHeight / pdfHeight);

			for (let i = 0; i < totalPages; i++) {
				const yOffset = -(i * pdfHeight);
				pdf.addImage(imgData, "PNG", 0, yOffset, pdfWidth, scaledImgHeight);

				if (i < totalPages - 1) {
					pdf.addPage();
				}
			}

			pdf.save("invoice.pdf");
		});
	};

	return (
		<div className="studentListBody">
			<div ref={pdfRef}>
				{/* Page Title Name */}
				<div className="studentListPageTitleContainer">
					<h2 className="studentListPageTitle">STUDENTS LIST</h2>
				</div>
				{/* Class Picker Container */}
				<div className="studentListClassPickerContainer">
					<p className="studentListClassTitle">CLASS: </p>
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
									{
										value: "inactive",
										label: "inactive",
									},
								]}
							/>
						</Space>
					</div>
				</div>
				{/* Tab Bar */}
				<div className="studentListTabbarOutterContainer">
					<div className="studentListTabbarInnerContainer">
						<p className="studentListTabName">NAME</p>
						<p className="studentListTabName">FATHER NAME</p>
						<p className="studentListTabName">NUMBER</p>
						<p className="studentListTabName">ADDRESS</p>
					</div>
				</div>
				{/* PlayGround of Student Details */}
				<div className="studentListStudentDetailOutterContainer">
					<div className="studentListStudentDetailInnerContainer">
						{studentData.map((data) => (
							<button
								className="studentListStudentDetailContainer"
								key={data.id}
								onClick={() => handleStudentDetailButton(data)}
							>
								<p className="studentListTabName">{data.name}</p>
								<p className="studentListTabName">{data.fatherName}</p>
								<p className="studentListTabName">{data.phoneNumber1}</p>
								<p className="studentListTabName">{data.address}</p>
							</button>
						))}
					</div>
				</div>
			</div>
			<button
				className="studentListAddStudentButton"
				onClick={() => handleNewStudentButton()}
			>
				<img
					src={require("../../../assets/icons/add.png")}
					className="studentListIcon"
				/>
			</button>
			<button
				className="studentListPdfGenerateButton"
				onClick={() => handlePdfGenerator()}
			>
				Print Report
			</button>
		</div>
	);
}
