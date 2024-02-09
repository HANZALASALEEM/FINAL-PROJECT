import React, { useEffect, useState } from "react";
import "./TimeTableDetailScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import TextInput from "../../../component/textInput/TextInput";
import { message, Select, Space } from "antd";

const TimeTableDetailScreen = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { timeTableData } = state;
	const [messageApi, contextHolder] = message.useMessage();
	const [periodNo, setPeriodNo] = useState(null);
	const [subject, setSubject] = useState(null);
	const [teacherName, setTeacherName] = useState(null);
	const [className, setClassName] = useState(null);
	const [startingTime, setStartingTime] = useState(null);
	const [endingTime, setEndingTime] = useState(null);

	useEffect(() => {
		setPeriodNo(timeTableData.periodNo);
		setSubject(timeTableData.subject);
		setTeacherName(timeTableData.teacherName);
		setClassName(timeTableData.class);
		setStartingTime(timeTableData.startingTime);
		setEndingTime(timeTableData.endingTime);
	}, []);

	const handleClassPicker = async (value) => {
		setClassName(value);
		const docRef = doc(db, "TimeTable", timeTableData.id);
		await updateDoc(docRef, {
			class: className,
		});
		messageApi.open({
			type: "success",
			content: "Class Updated in Database",
			duration: 10,
		});
	};

	const editPeriodNo = async () => {
		const docRef = doc(db, "TimeTable", timeTableData.id);
		await updateDoc(docRef, {
			periodNo: periodNo,
		});
		messageApi.open({
			type: "success",
			content: "Period No Updated in Database",
			duration: 10,
		});
	};

	const editSubject = async () => {
		const docRef = doc(db, "TimeTable", timeTableData.id);
		await updateDoc(docRef, {
			subject: subject,
		});
		messageApi.open({
			type: "success",
			content: "Subject Updated in Database",
			duration: 10,
		});
	};

	const editTeacherName = async () => {
		const docRef = doc(db, "TimeTable", timeTableData.id);
		await updateDoc(docRef, {
			teacherName: teacherName,
		});
		messageApi.open({
			type: "success",
			content: "Teacher Name Updated in Database",
			duration: 10,
		});
	};

	const editStartingTime = async () => {
		const docRef = doc(db, "TimeTable", timeTableData.id);
		await updateDoc(docRef, {
			startingTime: startingTime,
		});
		messageApi.open({
			type: "success",
			content: "Starting Time Updated in Database",
			duration: 10,
		});
	};

	const editEndingTime = async () => {
		const docRef = doc(db, "TimeTable", timeTableData.id);
		await updateDoc(docRef, {
			endingTime: endingTime,
		});
		messageApi.open({
			type: "success",
			content: "Ending Time Updated in Database",
			duration: 10,
		});
	};

	const deleteButton = async () => {
		try {
			await deleteDoc(doc(db, "TimeTable", timeTableData.id));
			messageApi.open({
				type: "success",
				content: "Time Table Deleted in Database",
				duration: 10,
			});

			navigate(-1);
		} catch (error) {
			console.error("Error deleting notification:", error);
			messageApi.open({
				type: "error",
				content: "Check Your Internet Connection",
				duration: 10,
			});
		}
	};

	return (
		<div className="timeTableDetailBody">
			{/* Page Title Name */}
			{contextHolder}
			<div className="timeTableDetailPageTitleContainer">
				<h2 className="timeTableDetailPageTitle">TIME TABLE DETAIL</h2>
			</div>
			{/* Playground Area */}
			<div className="timeTableDetailPlayground">
				<div className="timeTableDetailStudentInfo">
					<div className="timeTableDetailStudentInfoColoum">
						<TextInput
							title={"PERIOD NO: "}
							changeText={(text) => setPeriodNo(text)}
							value={periodNo}
							onEdit={() => editPeriodNo()}
						/>
						<TextInput
							title={"STARTING TIME: "}
							changeText={(text) => setStartingTime(text)}
							value={startingTime}
							onEdit={() => editStartingTime()}
						/>
					</div>
					<div className="timeTableDetailStudentInfoColoum">
						<TextInput
							title={"SUBJECT NAME: "}
							changeText={(text) => setSubject(text)}
							value={subject}
							onEdit={() => editSubject()}
						/>
						<TextInput
							title={"ENDING TIME: "}
							changeText={(text) => setEndingTime(text)}
							value={endingTime}
							onEdit={() => editEndingTime()}
						/>
					</div>
					<div className="timeTableDetailStudentInfoColoum">
						<TextInput
							title={"TEACHER NAME: "}
							changeText={(text) => setTeacherName(text)}
							value={teacherName}
							onEdit={() => editTeacherName()}
						/>
						{/* Class Picker Container */}
						<div className="timeTableDetailClassPickerContainer">
							<p className="timeTableDetailClassTitle">CLASS: </p>
							<div>
								<Space wrap>
									<Select
										defaultValue={className}
										style={{
											width: 150,
										}}
										onChange={handleClassPicker}
										options={[
											{
												value: "Choose Class",
												label: "Choose Class",
											},
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
					</div>
				</div>
			</div>
			{/* Delete Button */}
			<button
				className="timeTableDetailDeleteButton"
				onClick={() => deleteButton()}
			>
				Delete
			</button>
		</div>
	);
};

export default TimeTableDetailScreen;
