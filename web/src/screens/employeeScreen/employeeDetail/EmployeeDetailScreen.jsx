import React, { useEffect } from "react";
import "./EmployeeDetailScreen.css";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import TextInput from "../../../component/textInput/TextInput";
function EmployeeDetailScreen() {
	const { state } = useLocation();
	const { employeeData } = state;
	return (
		<div className="employeeDetailBody">
			{/* Page Title Name */}
			<div className="employeeDetailPageTitleContainer">
				<h2 className="employeeDetailPageTitle">{employeeData.name}</h2>
			</div>
			{/* Playground Area */}
			<div className="employeeDetailPlayground">
				<div className="employeeDetailEmployeeInfo">
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput title={"EMPLOYEE NAME: "} value={employeeData.name} />

						<TextInput
							title={"PREVIOUS JOB: "}
							value={employeeData.completedClass}
						/>
						<TextInput
							title={"CURRENT DESIGNATION: "}
							value={employeeData.completedClass}
						/>
						<TextInput
							title={"PHONE NUMBER 1: "}
							value={employeeData.phoneNumber1}
						/>
					</div>
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput
							title={"EMPLOYEE CNIC: "}
							value={employeeData.studentCNIC}
						/>
						<TextInput
							title={"PREVIOUS JOB SALARY: "}
							value={employeeData.completedClass}
						/>
						<TextInput
							title={"CURRENT SALARY: "}
							value={employeeData.completedClass}
						/>
						<TextInput
							title={"PHONE NUMBER 2: "}
							value={employeeData.phoneNumber2}
						/>
					</div>
					<div className="employeeDetailEmployeeInfoColoum">
						<TextInput
							title={"FATHER NAME: "}
							value={employeeData.fatherName}
						/>
						<TextInput
							title={"FATHER OCCUPATION: "}
							value={employeeData.fatherOccupation}
						/>
						<TextInput
							title={"CLASS INCHARGE: "}
							value={employeeData.motherEducation}
						/>
						<TextInput title={"ADDRESS: "} value={employeeData.address} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeeDetailScreen;
