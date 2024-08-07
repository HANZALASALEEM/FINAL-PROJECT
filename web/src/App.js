import "./App.css";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { Route, Routes } from "react-router-dom";
import react, { useState, useEffect } from "react";
import { db } from "./firebase/firebase.config";
import { getDocs, collection, query } from "firebase/firestore";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebase.config";
import SideBar from "./component/sideBar/SideBar";
import StudentListScreen from "./screens/studentScreen/studentList/StudentListScreen";
import StudentDetail from "./screens/studentScreen/studentDetail/StudentDetailScreen";
import EmployeeListScreen from "./screens/employeeScreen/employeeList/EmployeeListScreen";
import NewStudentScreen from "./screens/studentScreen/newStudentScreen/NewStudentScreen";
import EmployeeDetailScreen from "./screens/employeeScreen/employeeDetail/EmployeeDetailScreen";
import NewEmployeeScreen from "./screens/employeeScreen/newEmployee/NewEmployeeScreen";
import AdmissionListScreen from "./screens/admissionScreen/admissionList/AdmissionListScreen";
import NewAdmissionScreen from "./screens/admissionScreen/newAdmission/NewAdmissionScreen";
import FeeSubmissionListScreen from "./screens/feeSubmission/feeSubmissionList/FeeSubmissionListScreen";
import NewFeeSubmissionScreen from "./screens/feeSubmission/newFeeSubmission/NewFeeSubmissionScreen";
import NotificationListScreen from "./screens/notificationScreen/notificationList/NotificationListScreen";
import NewNotificationScreen from "./screens/notificationScreen/newNotification/NewNotificationScreen";
import NotificationDetailScreen from "./screens/notificationScreen/notificationDetail/NotificationDetailScreen";
import EventListScreen from "./screens/eventScreen/eventList/EventListScreen";
import NewEventScreen from "./screens/eventScreen/newEvent/NewEventScreen";
import EventDetailScreen from "./screens/eventScreen/eventDetail/EventDetailScreen";
import FeeSubmissionDetailScreen from "./screens/feeSubmission/feeeSubmissionDetail/FeeSubmissionDetailScreen";
import AdmissionDetailScreen from "./screens/admissionScreen/admissionDetail/AdmissionDetailScreen";
import ExpenseListScreen from "./screens/expenseScreen/expenseList/ExpenseListScreen";
import NewExpenseScreen from "./screens/expenseScreen/newExpense/NewExpenseScreen";
import ExpenseDetailScreen from "./screens/expenseScreen/expenseDetail/ExpenseDetailScreen";
import TimeTableListScreen from "./screens/timeTableScreen/timeTableList/TimeTableListScreen";
import NewTimeTableScreen from "./screens/timeTableScreen/newTimeTable/NewTimeTableScreen";
import TimeTableDetailScreen from "./screens/timeTableScreen/timeTableDetail/TimeTableDetailScreen";
function App() {
	const requestPermission = async () => {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			console.log("Permission Granted");
			const token = await getToken(messaging, {
				vapidKey:
					"BNgvjEysQ1LodAJzJINBK7-o4i0v0JdTbb6qoiXd-FuybAEU1aGsMFr69-v-iWwjIFRM1-BBbQIFabPAYIUAhfs",
			});
			console.log(token);
		} else if (permission === "denied") {
			console.log("Permission Granted");
		}
	};

	useEffect(() => {
		requestPermission();
	}, []);

	return (
		<>
			{window.location.pathname == "/" ? <div /> : <SideBar />}
			<Routes>
				<Route exact path="/" element={<LoginScreen />} />
				<Route exact path="StudentList" element={<StudentListScreen />} />
				<Route exact path="StudentDetail" element={<StudentDetail />} />
				<Route exact path="NewStudent" element={<NewStudentScreen />} />
				<Route exact path="EmployeeList" element={<EmployeeListScreen />} />
				<Route exact path="EmployeeDetail" element={<EmployeeDetailScreen />} />
				<Route exact path="NewEmployee" element={<NewEmployeeScreen />} />
				<Route exact path="AdmissionList" element={<AdmissionListScreen />} />
				<Route exact path="NewAdmission" element={<NewAdmissionScreen />} />
				<Route
					exact
					path="AdmissionDetail"
					element={<AdmissionDetailScreen />}
				/>
				<Route
					exact
					path="FeeSubmissionList"
					element={<FeeSubmissionListScreen />}
				/>
				<Route
					exact
					path="NewFeeSubmission"
					element={<NewFeeSubmissionScreen />}
				/>
				<Route
					exact
					path="FeeSubmissionDetail"
					element={<FeeSubmissionDetailScreen />}
				/>
				<Route
					exact
					path="NotificationList"
					element={<NotificationListScreen />}
				/>
				<Route
					exact
					path="NewNotification"
					element={<NewNotificationScreen />}
				/>
				<Route
					exact
					path="NotificationDetail"
					element={<NotificationDetailScreen />}
				/>
				<Route exact path="EventsList" element={<EventListScreen />} />
				<Route exact path="NewEvent" element={<NewEventScreen />} />
				<Route exact path="EventDetail" element={<EventDetailScreen />} />
				<Route exact path="ExpensesList" element={<ExpenseListScreen />} />
				<Route exact path="NewExpense" element={<NewExpenseScreen />} />
				<Route exact path="ExpenseDetail" element={<ExpenseDetailScreen />} />
				<Route exact path="TimeTableList" element={<TimeTableListScreen />} />
				<Route exact path="NewTimeTable" element={<NewTimeTableScreen />} />
				<Route
					exact
					path="TimeTableDetail"
					element={<TimeTableDetailScreen />}
				/>
			</Routes>
		</>
	);
}

export default App;
