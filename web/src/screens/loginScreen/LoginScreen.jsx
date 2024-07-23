import React, { useState } from "react";
import "./LoginScreen.css";
import { db } from "../../firebase/firebase.config";
import { getDocs, collection, query } from "firebase/firestore";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async (email, password) => {
		// Step 1: Query the Firestore collection "Administration" to get all documents
		const adminCollectionRef = collection(db, "Administration");
		const adminQuery = query(adminCollectionRef);

		try {
			const querySnapshot = await getDocs(adminQuery);

			// Step 2: Initialize a flag to check if a match is found
			let matchFound = false;

			// Step 3: Iterate through the documents
			querySnapshot.forEach((doc) => {
				const adminData = doc.data();

				// Step 4: Check if any document has the provided email and password
				if (adminData.email === email && adminData.password === password) {
					// If a match is found, allow the user to proceed to the next screen
					console.log("Match found");
					messageApi.success("Login Successful!");
					navigate("StudentList");
					window.location.reload();
					matchFound = true;
					return;
				}
			});

			// Step 5: If no match is found, display an alert
			if (!matchFound) {
				messageApi.error("Invalid email or password");
			}
		} catch (error) {
			console.error("Error getting documents: ", error);
			messageApi.error("An error occurred while trying to log in");
		}
	};

	return (
		<>
			<div className="loginScreenBody">
				<div className="loginScreenLeftContainer">
					<img
						className="loginScreenSuffahLogo"
						src={require("../../assets/images/suffah-logo.png")}
						alt="Suffah Logo"
					/>
				</div>
				<div className="loginScreenLoginScreenRightContainer">
					<h1 className="loginScreenWellcomeHeading">Wellcome!</h1>
					<h1 className="loginScreenNameHeading">Suffah Model School</h1>
					<div className="loginScreenFormContainer">
						{/* Email Input  */}
						<div className="loginScreenLableAndInputContainer">
							<p className="loginScreenLable">Email: </p>
							<input
								className="loginScreenTextInput"
								placeholder="Aministrative Email"
								value={email}
								onChange={(text) => {
									setEmail(text.target.value);
								}}
							/>
						</div>
						{/* Password Input */}
						<div className="loginScreenLableAndInputContainer mt-2">
							<p className="loginScreenLable">Password: </p>
							<input
								className="loginScreenTextInput"
								placeholder="Password"
								type="password"
								value={password}
								onChange={(text) => {
									setPassword(text.target.value);
								}}
							/>
						</div>
						{/* Login Button */}
						{contextHolder}
						<button
							type="button"
							className="loginScreenLoginButton"
							onClick={() => {
								login(email, password);
							}}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
