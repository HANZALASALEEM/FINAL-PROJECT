import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
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
			<div>
				<Button type="primary" onClick={showDrawer}>
					Open
				</Button>
				<Drawer
					title="Basic Drawer"
					onClose={onClose}
					open={open}
					placement="left"
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Drawer>
			</div>
		</div>
	);
}

export default SideBar;
