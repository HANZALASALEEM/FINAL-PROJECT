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
function App() {
	return (
		<>
			{window.location.pathname == "/" ? <div /> : <SideBar />}
			<Routes>
				<Route exact path="/" element={<LoginScreen />} />
				<Route exact path="StudentList" element={<StudentListScreen />} />
				<Route exact path="EmployeeList" element={<EmployeeListScreen />} />
				<Route exact path="StudentDetail" element={<StudentDetail />} />
			</Routes>
		</>
	);
}

export default App;
