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
				{/* <div className="logoAndTitle">
				<img
					src={require("../../assets/images/suffah-logo.png")}
					className="logo"
				/>
				<p className="title">SUFFAH ISLAMIC SCHOOL</p>
			</div>
			<div className="navbarContainer">
				<div className="navLink">
					<Link to="./StudentList">Student</Link>
				</div>
			</div> */}
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

						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
				</div>
				{/* Middle Container of Navbar */}
				<div className="logoAndTitle">
					<img
						src={require("../../assets/images/suffah-logo.png")}
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
