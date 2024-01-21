// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import SideBar from "../component/sideBar/SideBar";
// import StudentListScreen from "./studentScreen/studentList/StudentListScreen";
// function PageNavigator() {
// 	return (
// 		<div>
// 			<SideBar />
// 			<Routes>
// 				<Route path="/StudentList" element={<StudentListScreen />} />
// 			</Routes>
// 		</div>
// 	);
// }

// export default PageNavigator;
import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import SideBar from "../component/sideBar/SideBar";
import StudentListScreen from "./studentScreen/studentList/StudentListScreen";
import StudentDetail from "./studentScreen/studentDetail/StudentDetailScreen";

function PageNavigator() {
	return (
		<div>
			<SideBar />
			<Routes>
				<Route path="/" element={<StudentListScreen />} />
				<Route path="StudentDetail" element={<StudentDetail />} />
			</Routes>
		</div>
	);
}

export default PageNavigator;
