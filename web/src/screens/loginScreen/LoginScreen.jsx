import React, { useState } from "react";
import "./LoginScreen.css";
import { db } from "../../firebase/firebase.config";
import { getDocs, collection, query } from "firebase/firestore";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async (email, password) => {
		// Step 1: Query the Firestore collection "Administration" to get all documents
		const adminCollectionRef = collection(db, "Administration");
		const adminQuery = query(adminCollectionRef);

		try {
			const querySnapshot = await getDocs(adminQuery);

			// Step 2: Iterate through the documents
			querySnapshot.forEach((doc) => {
				const adminData = doc.data();

				// Step 3: Check if any document has the provided email and password
				if (
					adminData.email === "hanzala@suffah.edu.pk" ||
					adminData.password === password
					// >>>>>>>>>>>>>>>>>>>>>ERROR hy yahan<<<<<<<<<<<<<<<<<<<<<
				) {
					// If a match is found, allow the user to proceed to the next screen
					console.log("match found"); // Function to handle user authentication
				} else {
					// If no match is found
					console.log("Invalid email or password");
				}
			});
		} catch (error) {
			console.error("Error getting documents: ", error);
		}
	};
	return (
		<>
			<div className="body">
				<div className="leftContainer">
					<img
						className="suffahLogo"
						src={require("../../assets/images/suffah-logo.png")}
						alt="Suffah Logo"
					/>
				</div>
				<div className="rightContainer">
					<h1 className="wellcomeHeading">Wellcome!</h1>
					<h1 className="nameHeading">Suffah Model School</h1>
					<div className="formContainer">
						{/* Email Input  */}
						<div className="lableAndInputContainer">
							<p className="lable">Email: </p>
							<input
								className="textInput"
								placeholder="Aministrative Email"
								value={email}
								onChange={(text) => {
									setEmail(text.target.value);
								}}
							/>
						</div>
						{/* Password Input */}
						<div className="lableAndInputContainer mt-2">
							<p className="lable">Password: </p>
							<input
								className="textInput"
								placeholder="Password"
								type="password"
								value={password}
								onChange={(text) => {
									setPassword(text.target.value);
								}}
							/>
						</div>
						{/* Login Button */}
						<button type="button" className="loginButton" onClick={login}>
							Login
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
