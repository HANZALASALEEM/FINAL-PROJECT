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
			</Routes>
		</>
	);
}

export default App;
