import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../component/sideBar/SideBar";
import StudentListScreen from "./studentScreen/studentList/StudentListScreen";
function PageNavigator() {
	return (
		<div>
			<SideBar />
			<Routes>
				<Route path="/StudentList" element={<StudentListScreen />} />
			</Routes>
		</div>
	);
}

export default PageNavigator;
