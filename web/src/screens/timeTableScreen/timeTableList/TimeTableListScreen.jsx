import React, { useEffect, useState } from "react";
import "./TimeTableListScreen.css";
import { Select, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const TimeTableListScreen = () => {
	const navigate = useNavigate();
	const [className, setClassName] = useState("10");
	const [timeTableData, setTimeTableData] = useState([]);

	useEffect(() => {
		const getInitialTimeTable = async () => {
			const q = query(
				collection(db, "TimeTable"),
				where("class", "==", className)
			);
			const querySnapshot = await getDocs(q);
			const timeTable = [];
			querySnapshot.forEach((doc) => {
				timeTable.push({ id: doc.id, ...doc.data() });
			});
			setTimeTableData(timeTable);
		};

		getInitialTimeTable();
	}, [className]); // Add className to dependency array to rerun effect when it changes

	const handleClassPicker = (value) => {
		setClassName(value);
	};

	const handleTimeTableDetailButton = (data) => {
		// Navigate to another page and pass the data as props
		navigate("/TimeTableDetail", { state: { timeTableData: data } });
	};

	const handleNewTimeTableButton = () => {
		// Navigate to another page and pass the data as props
		navigate("/NewTimeTable");
	};

	return (
		<div className="timeTableListBody">
			{/* Page Title Name */}
			<div className="timeTableListPageTitleContainer">
				<h2 className="timeTableListPageTitle">TIME TABLE LIST</h2>
			</div>
			{/* Class Picker Container */}
			<div className="timeTableListClassPickerContainer">
				<p className="timeTableListClassTitle">CLASS: </p>
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
			<div className="timeTableListTabbarOutterContainer">
				<div className="timeTableListTabbarInnerContainer">
					<p className="timeTableListTabName">PERIOD NO</p>
					<p className="timeTableListTabName">TEACHER NAME</p>
					<p className="timeTableListTabName">SUBJECT</p>
					<p className="timeTableListTabName">STARTING TIME</p>
					<p className="timeTableListTabName">ENDING TIME</p>
				</div>
			</div>
			{/* PlayGround of Student Details */}
			<div className="timeTableListStudentDetailOutterContainer">
				<div className="timeTableListStudentDetailInnerContainer">
					{timeTableData.map((data) => (
						<button
							className="timeTableListStudentDetailContainer"
							key={data.id}
							onClick={() => handleTimeTableDetailButton(data)}
						>
							<p className="timeTableListTabName">{data.periodNo}</p>
							<p className="timeTableListTabName">{data.teacherName}</p>
							<p className="timeTableListTabName">{data.subject}</p>
							<p className="timeTableListTabName">{data.startingTime}</p>
							<p className="timeTableListTabName">{data.endingTime}</p>
						</button>
					))}
				</div>
			</div>
			<button
				className="timeTableListAddStudentButton"
				onClick={() => handleNewTimeTableButton()}
			>
				<img
					src={require("../../../assets/icons/add.png")}
					className="timeTableListIcon"
				/>
			</button>
		</div>
	);
};

export default TimeTableListScreen;
