import React, { useState, useEffect } from "react";
import "./NotificationListScreen.css";
import { Select, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
function NotificationListScreen() {
	const navigate = useNavigate();
	const [year, setYear] = useState("2024");
	const [notificationData, setNotificationData] = useState([]);

	useEffect(() => {
		const getInitialNotifications = async () => {
			try {
				const q = query(
					collection(db, "Notification"),
					where("year", "==", year)
				);
				const querySnapshot = await getDocs(q);
				const notifications = [];
				querySnapshot.forEach((doc) => {
					notifications.push({ id: doc.id, ...doc.data() });
				});
				setNotificationData(notifications);
			} catch (error) {
				console.error("Error fetching notifications: ", error);
			}
		};

		getInitialNotifications();
	}, [year]); // Add className to dependency array to rerun effect when it changes

	const handleYearPicker = (value) => {
		setYear(value);
	};

	const handleNewNotificationButton = () => {
		// Navigate to another page and pass the data as props
		navigate("/NewNotification");
	};
	return (
		<div className="notificationListBody">
			{/* Page Title Name */}
			<div className="notificationListPageTitleContainer">
				<h2 className="notificationListPageTitle">Notification List</h2>
			</div>
			{/* Class Picker Container */}
			<div className="notificationListClassPickerContainer">
				<p className="notificationListClassTitle">YEAR: </p>
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
							]}
						/>
					</Space>
				</div>
			</div>
			{/* Tab Bar */}
			<div className="notificationListTabbarOutterContainer">
				<div className="notificationListTabbarInnerContainer">
					<p className="notificationListTabNameDate">DATE</p>
					<p className="notificationListTabNameNotification">NOTIFICATION</p>
				</div>
			</div>
			{/* PlayGround of notification Details */}
			<div className="notificationListNotificationDetailOutterContainer">
				<div className="notificationListNotificationDetailInnerContainer">
					{notificationData.map((data) => (
						<button
							className="notificationListNotificationDetailContainer"
							key={data.id}
						>
							<p className="notificationListTabNameDate">
								{data.date.toDate().toLocaleDateString()}
							</p>
							<p className="notificationListTabNameNotification">
								{data.notification}
							</p>
						</button>
					))}
				</div>
			</div>
			<button
				className="notificationListAddNotificationButton"
				onClick={() => handleNewNotificationButton()}
			>
				<img
					src={require("../../../assets/icons/add.png")}
					className="notificationListIcon"
				/>
			</button>
		</div>
	);
}

export default NotificationListScreen;
