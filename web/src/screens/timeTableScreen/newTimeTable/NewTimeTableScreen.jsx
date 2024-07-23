import React, { useState } from "react";
import TextInput from "../../../component/textInput/TextInput";
import "./NewTimeTableScreen.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { message } from "antd";
import { Select, Space } from "antd";

const NewTimeTableScreen = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [periodNo, setPeriodNo] = useState(null);
	const [subject, setSubject] = useState(null);
	const [teacherName, setTeacherName] = useState(null);
	const [className, setClassName] = useState(null);
	const [startingTime, setStartingTime] = useState(null);
	const [endingTime, setEndingTime] = useState(null);
	const [timeTableEntries, setTimeTableEntries] = useState([]);

	const newTimeTableEntry = {
		periodNo: periodNo,
		subject: subject,
		teacherName: teacherName,
		class: className,
		startingTime: startingTime,
		endingTime: endingTime,
	};

	const handleClassPicker = (value) => {
		setClassName(value);
	};

	const handleSaveButton = async () => {
		if (!className || className === "Choose Class") {
			message.error("Please select a class");
			return;
		} else {
			// Proceed with form submission
			console.log("Form submitted with class:", className);
		}

		for (let key in newTimeTableEntry) {
			if (!newTimeTableEntry[key]) {
				messageApi.open({
					type: "error",
					content: `All fields are required. Missing: ${key}`,
					duration: 10,
				});
				return;
			}
		}

		try {
			// Add the new time table entry to the state
			setTimeTableEntries((prevEntries) => [...prevEntries, newTimeTableEntry]);

			setPeriodNo(null);
			setSubject(null);
			setTeacherName(null);
			setStartingTime(null);
			setEndingTime(null);

			// Use setDoc to update or create a document with a specific rollNo
			await addDoc(collection(db, "TimeTable"), newTimeTableEntry);

			messageApi.open({
				type: "success",
				content: "TimeTable Data Saved in Database",
				duration: 10,
			});
		} catch (error) {
			console.error("Error saving document: ", error);
		}
	};

	return (
		<div className="newTimeTableBody">
			{/* Page Title Name */}
			{contextHolder}
			<div className="newTimeTablePageTitleContainer">
				<h2 className="newTimeTablePageTitle">CREATE TIME TABLE</h2>
			</div>
			{/* Class Picker Container */}
			<div className="newTimeTableClassPickerContainer">
				<p className="newTimeTableClassTitle">CLASS: </p>
				<div>
					<Space wrap>
						<Select
							defaultValue="Choose Class"
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
			{/* Playground Area */}
			<div className="newTimeTablePlayground">
				<div className="newTimeTableStudentInfo">
					<div className="newTimeTableStudentInfoColoum">
						<TextInput
							title={"PERIOD NO: "}
							changeText={(text) => setPeriodNo(text)}
							value={periodNo}
						/>
						<TextInput
							title={"STARTING TIME: "}
							changeText={(text) => setStartingTime(text)}
							value={startingTime}
						/>
					</div>
					<div className="newTimeTableStudentInfoColoum">
						<TextInput
							title={"SUBJECT NAME: "}
							changeText={(text) => setSubject(text)}
							value={subject}
						/>
						<TextInput
							title={"ENDING TIME: "}
							changeText={(text) => setEndingTime(text)}
							value={endingTime}
						/>
					</div>
					<div className="newTimeTableStudentInfoColoum">
						<TextInput
							title={"TEACHER NAME: "}
							changeText={(text) => setTeacherName(text)}
							value={teacherName}
						/>
						{/* Save Button */}
						<button
							className="newTimeTableSaveButton"
							onClick={handleSaveButton}
						>
							Save
						</button>
					</div>
				</div>
				{/* For Time Table Rernder Component  */}
				{timeTableEntries.map((entry, index) => (
					<div className="newTimeTableStudentInfo" key={index}>
						<div className="newTimeTableStudentInfoColoum">
							<TextInput
								title={"PERIOD NO: "}
								value={entry.periodNo}
								readOnly
							/>
							<TextInput
								title={"STARTING TIME: "}
								value={entry.startingTime}
								readOnly
							/>
						</div>
						<div className="newTimeTableStudentInfoColoum">
							<TextInput
								title={"SUBJECT NAME: "}
								value={entry.subject}
								readOnly
							/>
							<TextInput
								title={"ENDING TIME: "}
								value={entry.endingTime}
								readOnly
							/>
						</div>
						<div className="newTimeTableStudentInfoColoum">
							<TextInput
								title={"TEACHER NAME: "}
								value={entry.teacherName}
								readOnly
							/>
							{/* Save Button */}
							<button className="newTimeTableSavedButton">Saved</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NewTimeTableScreen;
