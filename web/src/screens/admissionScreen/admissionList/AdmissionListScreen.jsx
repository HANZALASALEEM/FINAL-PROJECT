import React, { useState, useEffect, useRef } from "react";
import "./AdmissionListScreen.css";
import { Select, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function AdmissionListScreen() {
	const pdfRef = useRef();
	const navigate = useNavigate();
	const [year, setYear] = useState("2024");
	const [admissionData, setAdmissionData] = useState([]);

	useEffect(() => {
		const getInitialAdmissions = async () => {
			const q = query(collection(db, "Admission"), where("year", "==", year));
			const querySnapshot = await getDocs(q);
			const admissions = [];
			querySnapshot.forEach((doc) => {
				admissions.push({ id: doc.id, ...doc.data() });
			});
			setAdmissionData(admissions);
		};

		getInitialAdmissions();
	}, [year]); // Add className to dependency array to rerun effect when it changes

	const handleYearPicker = (value) => {
		setYear(value);
	};

	const handleAdmissionDetailButton = (data) => {
		// Navigate to another page and pass the data as props
		navigate("/AdmissionDetail", { state: { admissionData: data } });
	};

	const handleNewAdmissionButton = () => {
		// Navigate to another page and pass the data as props
		navigate("/NewAdmission");
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
		<div className="admissionListBody">
			<div ref={pdfRef}>
				{/* Page Title Name */}
				<div className="admissionListPageTitleContainer">
					<h2 className="admissionListPageTitle">ADMISSION LIST</h2>
				</div>
				{/* Class Picker Container */}
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
									{
										value: "2031",
										label: "2031",
									},
									{
										value: "2032",
										label: "2032",
									},
									{
										value: "2033",
										label: "2033",
									},
									{
										value: "2034",
										label: "2034",
									},
									{
										value: "2035",
										label: "2035",
									},
								]}
							/>
						</Space>
					</div>
				</div>
				{/* Tab Bar */}
				<div className="admissionListTabbarOutterContainer">
					<div className="admissionListTabbarInnerContainer">
						<p className="admissionListTabName">NAME</p>
						<p className="admissionListTabName">FATHER NAME</p>
						<p className="admissionListTabName">CLASS</p>
						<p className="admissionListTabName">NUMBER</p>
						<p className="admissionListTabName">ADDRESS</p>
					</div>
				</div>
				{/* PlayGround of admission Details */}
				<div className="admissionListAdmissionDetailOutterContainer">
					<div className="admissionListAdmissionDetailInnerContainer">
						{admissionData.map((data) => (
							<button
								className="admissionListAdmissionDetailContainer"
								key={data.id}
								onClick={() => handleAdmissionDetailButton(data)}
							>
								<p className="admissionListTabName">{data.name}</p>
								<p className="admissionListTabName">{data.fatherName}</p>
								<p className="admissionListTabName">{data.class}</p>
								<p className="admissionListTabName">{data.phoneNumber1}</p>
								<p className="admissionListTabName">{data.address}</p>
							</button>
						))}
					</div>
				</div>
			</div>
			<button
				className="admissionListAddAdmissionButton"
				onClick={() => handleNewAdmissionButton()}
			>
				<img
					src={require("../../../assets/icons/add.png")}
					className="admissionListIcon"
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

export default AdmissionListScreen;
