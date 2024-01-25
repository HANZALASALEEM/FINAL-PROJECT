import "./App.css";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { Route, Routes } from "react-router-dom";
import PageNavigator from "./screens/PageNavigator";
import react, { useState } from "react";
import { db } from "./firebase/firebase.config";
import { getDocs, collection, query } from "firebase/firestore";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
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
function App() {
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
					path="FeeSubmissionList"
					element={<FeeSubmissionListScreen />}
				/>
				<Route
					exact
					path="NewFeeSubmission"
					element={<NewFeeSubmissionScreen />}
				/>
			</Routes>
		</>
	);
}

export default App;
