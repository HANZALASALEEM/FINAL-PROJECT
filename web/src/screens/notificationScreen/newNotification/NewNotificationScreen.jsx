import React, { useState, useEffect } from "react";
import "./NewNotificationScreen.css";
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { message, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getMessaging } from "firebase/messaging";
import axios from "axios";

function NewNotificationScreen() {
	const registrationToken =
		"BNgvjEysQ1LodAJzJINBK7-o4i0v0JdTbb6qoiXd-FuybAEU1aGsMFr69-v-iWwjIFRM1-BBbQIFabPAYIUAhfs";
	const [messageApi, contextHolder] = message.useMessage();
	const [date, setDate] = useState(null);
	const [notification, setNotification] = useState(null);
	const [year, setYear] = useState(null);
	const [tokens, setTokens] = useState([]);
	dayjs.extend(customParseFormat);

	useEffect(() => {
		const fetchTokens = async () => {
			const tokensArray = [];
			try {
				const querySnapshot = await getDocs(collection(db, "FcmToken"));
				querySnapshot.forEach((doc) => {
					tokensArray.push(doc.data().token);
				});
			} catch (error) {
				console.error("Error fetching tokens: ", error);
			}
			setTokens(tokensArray);
		};

		fetchTokens();
	}, []);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
	// const newNotificationData = {
	// 	date: date,
	// 	notification: notification,
	// 	year: year,
	// };
	const notificationMessage = {
		data: {
			title: "New Notification",
			body: notification,
		},
		token: tokens,
	};
	const handleDatePicker = (value) => {
		setDate(value.$d);
		setYear(value.$y.toString());
	};
	const handleSaveButton = async () => {
		const newNotificationData = {
			date: date,
			notification: notification,
			year: year,
		};

		for (let key in newNotificationData) {
			if (!newNotificationData[key]) {
				messageApi.open({
					type: "error",
					content: `All fields are required. Missing: ${key}`,
					duration: 10,
				});
				return;
			}
		}

		try {
			const notificationCollectionRef = collection(db, "Notification");

			// Use setDoc to update or create a document with a specific rollNo
			await addDoc(notificationCollectionRef, newNotificationData);

			messageApi.open({
				type: "success",
				content: "New Notification Saved in Database",
				duration: 10,
			});
			const payload = {
				title: "New Notification",
				body: notification,
				data: newNotificationData,
			};
			await axios.post(
				"https://firebase-cloud-message-suffah-school/sendNotification",
				payload
			);
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
						/>
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
