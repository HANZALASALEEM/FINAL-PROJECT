import React, { useEffect, useState } from "react";
import "./EmployeeListScreen.css";
import { Select, Space } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
function EmployeeListScreen() {
	const navigate = useNavigate();
	const [employeeData, setEmployeeData] = useState([]);

	useEffect(() => {
		const getInitialStudents = async () => {
			const q = query(collection(db, "Employee"));
			const querySnapshot = await getDocs(q);
			const employees = [];
			querySnapshot.forEach((doc) => {
				employees.push({ id: doc.id, ...doc.data() });
			});
			setEmployeeData(employees);
		};

		getInitialStudents();
	}, []);

	const handleEmployeeDetailButton = (data) => {
		// Navigate to another page and pass the data as props
		navigate("/EmployeeDetail", { state: { employeeData: data } });
	};

	const handleNewEmployeeButton = () => {
		navigate("/NewEmployee");
	};
	return (
		<div className="employeeListBody">
			{/* Page Title Name */}
			<div className="employeeListPageTitleContainer">
				<h2 className="employeeListPageTitle">Employees List</h2>
			</div>
			{/* Tab Bar */}
			<div className="employeeListTabbarOutterContainer">
				<div className="employeeListTabbarInnerContainer">
					<p className="employeeListTabName">NAME</p>
					<p className="employeeListTabName">FATHER NAME</p>
					<p className="employeeListTabName">NUMBER</p>
					<p className="employeeListTabName">ADDRESS</p>
				</div>
			</div>
			{/* PlayGround of Employee Details */}
			<div className="employeeListEmployeeDetailOutterContainer">
				<div className="employeeListEmployeeDetailInnerContainer">
					{employeeData.map((data) => (
						<button
							className="employeeListEmployeeDetailContainer"
							key={data.id}
							onClick={() => handleEmployeeDetailButton(data)}
						>
							<p className="employeeListTabName">{data.name}</p>
							<p className="employeeListTabName">{data.fatherName}</p>
							<p className="employeeListTabName">{data.phoneNumber1}</p>
							<p className="employeeListTabName">{data.address}</p>
						</button>
					))}
				</div>
			</div>
			<button
				className="employeeListAddEmployeeButton"
				onClick={() => handleNewEmployeeButton()}
			>
				<img
					src={require("../../../assets/icons/add.png")}
					className="employeeListIcon"
				/>
			</button>
		</div>
	);
}

export default EmployeeListScreen;
