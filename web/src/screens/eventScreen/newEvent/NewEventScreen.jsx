import React, { useState } from "react";
import "./NewEventScreen.css";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase.config";
import { message, DatePicker, Space, Upload, Button, Input } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { UploadOutlined } from "@ant-design/icons";
function NewEventScreen() {
	const [messageApi, contextHolder] = message.useMessage();
	const [date, setDate] = useState(null);
	const [event, setEvent] = useState(null);
	const [year, setYear] = useState(null);
	const [image, setImage] = useState(null);
	dayjs.extend(customParseFormat);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
	const newEventData = {
		date: date,
		event: event,
		year: year,
		image: image,
	};

	const handleDatePicker = (value) => {
		setDate(value.$d);
		setYear(value.$y.toString());
	};

	const handleImageChange = (info) => {
		if (info.file.status === "done") {
			// Image has been uploaded successfully
			const imageUrl = info.file.response.imageUrl;
			setImage(imageUrl);
			message.success("Image uploaded successfully");
		} else if (info.file.status === "error") {
			// Image upload failed
			message.error("Image upload failed");
			message.info("Error in handle Image Change");
		}
	};

	const customRequest = async ({ file, onSuccess, onError }) => {
		try {
			console.log("Starting image upload...");
			const storageRef = ref(storage, `eventImages/${file.name}`);
			const snapshot = await uploadBytes(storageRef, file);
			const downloadUrl = await getDownloadURL(snapshot.ref);
			console.log("Image uploaded successfully!");
			// Provide the image URL to the onSuccess callback
			onSuccess({ imageUrl: downloadUrl });
			message.info("Costom Request Done");
		} catch (error) {
			console.error("Error uploading image:", error);
			onError(error);
			message.info("Costom Request Failed");
		}
	};
	const handleSaveButton = async () => {
		try {
			const eventCollectionRef = collection(db, "Event");

			// Use setDoc to update or create a document with a specific rollNo
			await addDoc(eventCollectionRef, newEventData);

			messageApi.open({
				type: "success",
				content: "New Event Saved in Database",
				duration: 10,
			});
		} catch (error) {
			console.error("Error saving document: ", error);
			console.log(event);
		}
	};
	return (
		<div className="newEventBody">
			{/* Page Title Name */}
			<div className="newEventPageTitleContainer">
				<h2 className="newEventPageTitle">ADD NEW EVENT</h2>
			</div>
			{/* JUST FOR SPACE */}
			<div className="EventListClassPickerContainer"></div>
			{/* Playground Area */}
			<div className="newEventPlayground">
				<div className="newEventEventInfo">
					{/* Date Picker Container */}
					<div style={{ display: "flex", flexDirection: "row", width: "95%" }}>
						<div className="EventListClassPickerContainer">
							<p className="EventListClassTitle">DATE: </p>
							<div>
								<Space direction="vertical" size={12}>
									<DatePicker
										defaultValue={dayjs("01/01/2024", dateFormatList[0])}
										format={dateFormatList}
										onChange={handleDatePicker}
									/>
								</Space>
							</div>
						</div>
						<Upload
							customRequest={customRequest}
							showUploadList={false}
							onChange={handleImageChange}
						>
							<Button icon={<UploadOutlined />}>Add Image</Button>
						</Upload>
						{/* <button className="newEventAddImageButton">Add Image</button> */}
					</div>
					<div className="newEventInputContainer">
						<p className="EventListClassTitle">EVENT: </p>
						<textarea
							className="newEventInput"
							rows="15"
							cols="30"
							onChange={(text) => setEvent(text.target.value)}
						/>
					</div>
				</div>
			</div>
			{/* Save Button */}
			{contextHolder}
			<button className="newEventSaveButton" onClick={handleSaveButton}>
				Save
			</button>
		</div>
	);
}

export default NewEventScreen;
