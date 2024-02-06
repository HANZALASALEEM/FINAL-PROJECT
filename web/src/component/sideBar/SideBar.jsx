import React, { useState } from "react";
import "./SideBar.css";
import { NavLink, Outlet } from "react-router-dom";
import { Button, Drawer } from "antd";
function SideBar() {
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	return (
		<>
			<div className="sideBarContainer">
				{/* Left Container of Navbar  */}
				<div>
					<Button type="primary" onClick={showDrawer}>
						Drawer
					</Button>
					<Drawer
						title="Drawer"
						onClose={onClose}
						open={open}
						placement="left"
						width={250}
					>
						<div className="navLink">
							<NavLink
								to="/StudentList"
								className="link"
								activeClassName="active"
							>
								Student
							</NavLink>
						</div>
						<div className="navLink">
							<NavLink
								to="/EmployeeList"
								className="link"
								activeClassName="active"
							>
								Employee
							</NavLink>
						</div>
						<div className="navLink">
							<NavLink
								to="/AdmissionList"
								className="link"
								activeClassName="active"
							>
								Admission
							</NavLink>
						</div>
						<div className="navLink">
							<NavLink
								to="/FeeSubmissionList"
								className="link"
								activeClassName="active"
							>
								Fee Submission
							</NavLink>
						</div>
						<div className="navLink">
							<NavLink
								to="/TimeTableList"
								className="link"
								activeClassName="active"
							>
								Time Table
							</NavLink>
						</div>
						<div className="navLink">
							<NavLink
								to="/NotificationList"
								className="link"
								activeClassName="active"
							>
								Notification
							</NavLink>
						</div>
						<div className="navLink">
							<NavLink
								to="/EventsList"
								className="link"
								activeClassName="active"
							>
								Events
							</NavLink>
						</div>
						<div className="navLink">
							<NavLink
								to="/ExpensesList"
								className="link"
								activeClassName="active"
							>
								Expenses
							</NavLink>
						</div>
					</Drawer>
				</div>
				{/* Middle Container of Navbar */}
				<div className="logoAndTitle">
					<img
						src={require("../../assets/images/suffah-mono.png")}
						className="logo"
					/>
					<p className="title">SUFFAH ISLAMIC SCHOOL</p>
				</div>
				{/* Right Idle Container of Navbar */}
				<div />
			</div>
			<Outlet />
		</>
	);
}

export default SideBar;
