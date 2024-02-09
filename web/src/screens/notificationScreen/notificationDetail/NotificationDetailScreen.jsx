import React, { useEffect, useState } from "react";
import "./NotificationDetailScreen.css";
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
import { message, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
function NotificationDetailScreen() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { notificationData } = state;
	const [messageApi, contextHolder] = message.useMessage();
	const [date, setDate] = useState(null);
	const [year, setYear] = useState(null);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		setDate(notificationData.date);
		setYear(notificationData.year);
		setNotification(notificationData.notification);
	}, []);

	dayjs.extend(customParseFormat);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

	const handleDatePicker = (value) => {
		setDate(value.$d);
		setYear(value.$y.toString());
	};

	const editDate = async () => {
		const docRef = doc(db, "Notification", notificationData.id);
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

	const editNotification = async () => {
		const docRef = doc(db, "Notification", notificationData.id);
		await updateDoc(docRef, {
			notification: notification,
		});
		messageApi.open({
			type: "success",
			content: "Content of Notification Updated in Database",
			duration: 10,
		});
	};

	const deleteButton = async () => {
		try {
			await deleteDoc(doc(db, "Notification", notificationData.id));
			messageApi.open({
				type: "success",
				content: "Notification Deleted in Database",
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
		<div className="notificationDetailBody">
			{/* Page Title Name */}
			<div className="notificationDetailPageTitleContainer">
				<h2 className="notificationDetailPageTitle">NOTIFICATION DETAIL</h2>
			</div>
			{/* JUST FOR SPACE */}
			<div className="NotificationListClassPickerContainer"></div>
			{/* Playground Area */}
			<div className="notificationDetailPlayground">
				<div className="notificationDetailNotificationInfo">
					{/* Date Picker Container */}
					<div className="NotificationListClassPickerContainer">
						<p className="NotificationListClassTitle">DATE: </p>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<Space direction="vertical" size={12}>
								<DatePicker
									defaultValue={dayjs("01/01/2024", dateFormatList[0])}
									format={dateFormatList}
									onChange={handleDatePicker}
									// value={date}
								/>
							</Space>
							<button
								className="notificationDetailEditButton"
								onClick={() => {
									editDate();
								}}
							>
								<img
									src={require("../../../assets/icons/edit-gray.png")}
									className="notificationDetailEditButtonIcon"
								/>
							</button>
						</div>
						{/* <input className="notificationDetailDateAndYearInput" value={date} /> */}
					</div>
					<div className="notificationDetailInputContainer">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<p className="NotificationListClassTitle">NOTIFICATION: </p>
							<button
								className="notificationDetailEditButton"
								onClick={() => {
									editNotification();
								}}
							>
								<img
									src={require("../../../assets/icons/edit-gray.png")}
									className="notificationDetailEditButtonIcon"
								/>
							</button>
						</div>
						<textarea
							className="notificationDetailInput"
							rows="15"
							cols="30"
							value={notification}
							onChange={(text) => setNotification(text.target.value)}
						/>
					</div>
				</div>
			</div>
			{/* Delete Button */}
			{contextHolder}
			<button className="notificationDetailDeleteButton" onClick={deleteButton}>
				Delete
			</button>
		</div>
	);
}

export default NotificationDetailScreen;
