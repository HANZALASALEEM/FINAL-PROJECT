import React, { useState, useEffect } from "react";
import "./EventListScreen.css";
import { Select, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

function EventListScreen() {
	const navigate = useNavigate();
	const [year, setYear] = useState("2024");
	const [eventData, setEventData] = useState([]);

	useEffect(() => {
		const getInitialEvents = async () => {
			try {
				const q = query(collection(db, "Event"), where("year", "==", year));
				const querySnapshot = await getDocs(q);
				const events = [];
				querySnapshot.forEach((doc) => {
					events.push({ id: doc.id, ...doc.data() });
				});
				setEventData(events);
			} catch (error) {
				console.error("Error fetching events: ", error);
			}
		};

		getInitialEvents();
	}, [year]); // Add className to dependency array to rerun effect when it changes

	const handleYearPicker = (value) => {
		setYear(value);
	};

	const handleEventDetailButton = (data) => {
		// Navigate to another page and pass the data as props
		navigate("/EventDetail", { state: { eventData: data } });
	};

	const handleNewEventButton = () => {
		// Navigate to another page and pass the data as props
		navigate("/NewEvent");
	};

	return (
		<div className="eventListBody">
			{/* Page Title Name */}
			<div className="eventListPageTitleContainer">
				<h2 className="eventListPageTitle">EVENTS LIST</h2>
			</div>
			{/* Class Picker Container */}
			<div className="eventListClassPickerContainer">
				<p className="eventListClassTitle">YEAR: </p>
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
			<div className="eventListTabbarOutterContainer">
				<div className="eventListTabbarInnerContainer">
					<p className="eventListTabNameDate">DATE</p>
					<p className="eventListTabNameEvent">EVENT</p>
				</div>
			</div>
			{/* PlayGround of event Details */}
			<div className="eventListEventDetailOutterContainer">
				<div className="eventListEventDetailInnerContainer">
					{eventData.map((data) => (
						<button
							className="eventListEventDetailContainer"
							key={data.id}
							onClick={() => handleEventDetailButton(data)}
						>
							<p className="eventListTabNameDate">
								{data.date.toDate().toLocaleDateString()}
							</p>
							<p className="eventListTabNameEvent">
								{data.event.length > 100
									? `${data.event.substring(0, 100)}...`
									: data.event}
							</p>
						</button>
					))}
				</div>
			</div>
			<button
				className="eventListAddEventButton"
				onClick={() => handleNewEventButton()}
			>
				<img
					src={require("../../../assets/icons/add.png")}
					className="eventListIcon"
				/>
			</button>
		</div>
	);
}

export default EventListScreen;
