import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
function SideBar() {
	return (
		<div className="sideBarContainer">
			<div className="logoAndTitle">
				<img
					src={require("../../assets/images/suffah-logo.png")}
					className="logo"
				/>
				<p className="title">SUFFAH ISLAMIC SCHOOL</p>
			</div>
			<div className="navbarContainer">
				<div className="navLink">
					<Link to="/StudentList">Student</Link>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
