import React, { useState } from "react";
import "./NewNotificationScreen.css";
import TextInput from "../../../component/textInput/TextInput";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { message, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function NewNotificationScreen() {
	const [messageApi, contextHolder] = message.useMessage();
	const [date, setDate] = useState(null);
	const [notification, setNotification] = useState(null);
	const [year, setYear] = useState(null);
	dayjs.extend(customParseFormat);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
	const newNotificationData = {
		date: date,
		notification: notification,
		year: year,
	};

	const handleDatePicker = (value) => {
		setDate(value.$d);
		setYear(value.$y.toString());
	};
	const handleSaveButton = async () => {
		try {
			const notificationCollectionRef = collection(db, "Notification");

			// Use setDoc to update or create a document with a specific rollNo
			await addDoc(notificationCollectionRef, newNotificationData);

			messageApi.open({
				type: "success",
				content: "New Notification Saved in Database",
				duration: 10,
			});
		} catch (error) {
			console.error("Error saving document: ", error);
			console.log(notification);
		}
	};
	return (
		<div className="newNotificationBody">
			{/* Page Title Name */}
			<div className="newNotificationPageTitleContainer">
				<h2 className="newNotificationPageTitle">ADD NEW NOTIFICATION</h2>
			</div>
			{/* JUST FOR SPACE */}
			<div className="NotificationListClassPickerContainer"></div>
			{/* Playground Area */}
			<div className="newNotificationPlayground">
				<div className="newNotificationNotificationInfo">
					{/* Date Picker Container */}
					<div className="NotificationListClassPickerContainer">
						<p className="NotificationListClassTitle">DATE: </p>
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
					<div className="newNotificationInputContainer">
						<p className="NotificationListClassTitle">NOTIFICATION: </p>
						<textarea
							className="newNotificationInput"
							rows="15"
							cols="30"
							onChange={(text) => setNotification(text.target.value)}
						>
							Type the Content of the Notification.
						</textarea>
					</div>
				</div>
			</div>
			{/* Save Button */}
			{contextHolder}
			<button className="newNotificationSaveButton" onClick={handleSaveButton}>
				Save
			</button>
		</div>
	);
}

export default NewNotificationScreen;
