import React, { useState, useEffect } from "react";
import "./EventDetailScreen.css";
import {
	collection,
	addDoc,
	setDoc,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase.config";
import { message, DatePicker, Space, Upload, Button, Input } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
function EventDetailScreen() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { eventData } = state;
	const [messageApi, contextHolder] = message.useMessage();
	const [date, setDate] = useState(null);
	const [event, setEvent] = useState(null);
	const [year, setYear] = useState(null);
	const [image, setImage] = useState(null);
	dayjs.extend(customParseFormat);

	useEffect(() => {
		setDate(eventData.date);
		setYear(eventData.year);
		setEvent(eventData.event);

		console.log(date);
		console.log(year);
		console.log(event);
	}, []);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

	const handleDatePicker = (value) => {
		setDate(value.$d);
		setYear(value.$y.toString());
	};

	const editDate = async () => {
		const docRef = doc(db, "Event", eventData.id);
		await updateDoc(docRef, {
			date: date,
			year: year,
		});
		messageApi.open({
			type: "success",
			content: "Date Updated in Database",
			duration: 10,
		});
	};

	const editEvent = async () => {
		const docRef = doc(db, "Event", eventData.id);
		await updateDoc(docRef, {
			event: event,
		});
		messageApi.open({
			type: "success",
			content: "Content of Notification Updated in Database",
			duration: 10,
		});
	};

	const handleImageChange = async (info) => {
		if (info.file.status === "done") {
			// Image has been uploaded successfully
			const imageUrl = info.file.response.imageUrl;
			setImage(imageUrl);
			const docRef = doc(db, "Event", eventData.id);
			await updateDoc(docRef, {
				image: image,
			});
			messageApi.open({
				type: "success",
				content: "New Image Updated in Database",
				duration: 10,
			});
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

	const deleteButton = async () => {
		try {
			await deleteDoc(doc(db, "Event", eventData.id));
			messageApi.open({
				type: "success",
				content: "Event Deleted in Database",
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
		<div className="eventDetailBody">
			{contextHolder}
			{/* Page Title Name */}
			<div className="eventDetailPageTitleContainer">
				<h2 className="eventDetailPageTitle">EVENT DETAIL</h2>
			</div>
			{/* JUST FOR SPACE */}
			<div className="eventDetailClassPickerContainer"></div>
			{/* Playground Area */}
			<div className="eventDetailPlayground">
				<div className="eventDetailEventInfo">
					{/* Date Picker Container */}
					<div style={{ display: "flex", flexDirection: "row", width: "95%" }}>
						<div className="eventDetailClassPickerContainer">
							<p className="eventDetailClassTitle">DATE: </p>
							<div>
								<Space direction="vertical" size={12}>
									<DatePicker
										defaultValue={dayjs("01/01/2024", dateFormatList[0])}
										format={dateFormatList}
										onChange={handleDatePicker}
									/>
								</Space>
							</div>
							<button
								className="eventDetailEditButton"
								onClick={() => {
									editDate();
								}}
							>
								<img
									src={require("../../../assets/icons/edit-gray.png")}
									className="eventDetailEditButtonIcon"
								/>
							</button>
						</div>

						<Upload
							customRequest={customRequest}
							showUploadList={false}
							onChange={handleImageChange}
						>
							<Button icon={<UploadOutlined />}>Replace Image</Button>
						</Upload>
					</div>
					<div className="eventDetailInputContainer">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<p className="eventDetailClassTitle">EVENT: </p>
							<button
								className="eventDetailEditButton"
								onClick={() => {
									editEvent();
								}}
							>
								<img
									src={require("../../../assets/icons/edit-gray.png")}
									className="eventDetailEditButtonIcon"
								/>
							</button>
						</div>
						<textarea
							className="eventDetailInput"
							rows="15"
							cols="30"
							value={event}
							onChange={(text) => setEvent(text.target.value)}
						/>
					</div>
				</div>
			</div>
			{/* Delete Button */}

			<button className="eventDetailDeleteButton" onClick={deleteButton}>
				Delete
			</button>
		</div>
	);
}

export default EventDetailScreen;
