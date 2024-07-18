// import React, { useState, useEffect } from "react";
// import * as GoogleGenerativeAI from "@google/generative-ai";
// import {
// 	View,
// 	Text,
// 	TextInput,
// 	FlatList,
// 	StyleSheet,
// 	ActivityIndicator,
// 	TouchableOpacity,
// } from "react-native";
// import * as Speech from "expo-speech";
// import { FontAwesome } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// import FlashMessage, { showMessage } from "react-native-flash-message";

// const GeminiChat = () => {
// 	const [messages, setMessages] = useState([]);
// 	const [userInput, setUserInput] = useState("");
// 	const [loading, setLoading] = useState(false);
// 	const [isSpeaking, setIsSpeaking] = useState(false);
// 	const [showStopIcon, setShowStopIcon] = useState(false);

// 	const API_KEY = "AIzaSyCQ1Xvl5P9tbo8MeR1EZOvZDUXZQYBhG64";

// 	useEffect(() => {
// 		const startChat = async () => {
// 			const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
// 			const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// 			const prompt = "hello! ";
// 			const result = await model.generateContent(prompt);
// 			const response = result.response;
// 			const text = response.text();
// 			console.log(text);
// 			showMessage({
// 				message: "Welcome to Gemini Chat 🤖",
// 				description: text,
// 				type: "info",
// 				icon: "info",
// 				duration: 2000,
// 			});
// 			setMessages([
// 				{
// 					text,
// 					user: false,
// 				},
// 			]);
// 		};
// 		//function call
// 		startChat();
// 	}, []);

// 	const sendMessage = async () => {
// 		setLoading(true);
// 		const userMessage = { text: userInput, user: true };
// 		setMessages([...messages, userMessage]);

// 		const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
// 		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// 		const prompt = userMessage.text;
// 		const result = await model.generateContent(prompt);
// 		const response = result.response;
// 		const text = response.text();
// 		setMessages([...messages, { text, user: false }]);
// 		setLoading(false);
// 		setUserInput("");

// 		// if (text) {
// 		//   Speech.speak(text);
// 		// }
// 		if (text && !isSpeaking) {
// 			Speech.speak(text);
// 			setIsSpeaking(true);
// 			setShowStopIcon(true);
// 		}
// 	};

// 	const toggleSpeech = () => {
// 		console.log("isSpeaking", isSpeaking);
// 		if (isSpeaking) {
// 			Speech.stop();
// 			setIsSpeaking(false);
// 		} else {
// 			Speech.speak(messages[messages.length - 1].text);
// 			setIsSpeaking(true);
// 		}
// 	};

// 	const ClearMessage = () => {
// 		setMessages("");
// 		setIsSpeaking(false);
// 	};

// 	const renderMessage = ({ item }) => (
// 		<View style={styles.messageContainer}>
// 			<Text style={[styles.messageText, item.user && styles.userMessage]}>
// 				{item.text}
// 			</Text>
// 		</View>
// 	);

// 	return (
// 		<View style={styles.container}>
// 			<FlatList
// 				data={messages}
// 				renderItem={renderMessage}
// 				keyExtractor={(item) => item.text}
// 				inverted
// 			/>
// 			<View style={styles.inputContainer}>
// 				<TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
// 					{isSpeaking ? (
// 						<FontAwesome
// 							name="microphone-slash"
// 							size={24}
// 							color="white"
// 							style={{
// 								justifyContent: "center",
// 								alignItems: "center",
// 							}}
// 						/>
// 					) : (
// 						<FontAwesome
// 							name="microphone"
// 							size={24}
// 							color="white"
// 							style={{
// 								justifyContent: "center",
// 								alignItems: "center",
// 							}}
// 						/>
// 					)}
// 				</TouchableOpacity>
// 				<TextInput
// 					placeholder="Type a message"
// 					onChangeText={setUserInput}
// 					value={userInput}
// 					onSubmitEditing={sendMessage}
// 					style={styles.input}
// 					placeholderTextColor="#fff"
// 				/>
// 				{
// 					//show stop icon only when speaking
// 					showStopIcon && (
// 						<TouchableOpacity style={styles.stopIcon} onPress={ClearMessage}>
// 							<Entypo name="controller-stop" size={24} color="white" />
// 						</TouchableOpacity>
// 					)
// 				}
// 				{/* {loading && <ActivityIndicator size="large" color="black" />} */}
// 			</View>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: { flex: 1, backgroundColor: "#ffff", marginTop: 50 },
// 	messageContainer: { padding: 10, marginVertical: 5 },
// 	messageText: { fontSize: 16 },
// 	inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
// 	input: {
// 		flex: 1,
// 		padding: 10,
// 		backgroundColor: "#131314",
// 		borderRadius: 10,
// 		height: 50,
// 		color: "white",
// 	},
// 	micIcon: {
// 		padding: 10,
// 		backgroundColor: "#131314",
// 		borderRadius: 25,
// 		height: 50,
// 		width: 50,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		marginRight: 5,
// 	},
// 	stopIcon: {
// 		padding: 10,
// 		backgroundColor: "#131314",
// 		borderRadius: 25,
// 		height: 50,
// 		width: 50,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		marginLeft: 3,
// 	},
// });

// export default GeminiChat;

import * as GoogleGenerativeAI from "@google/generative-ai";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const GeminiChat = () => {
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState("");
	const [outputMessage, setOutputMessage] = useState(
		"Results should be shown here."
	);
	const [loading, setLoading] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [showStopIcon, setShowStopIcon] = useState(false);
	const [isTyping, setIsTyping] = useState(false);

	const API_KEY = "AIzaSyCQ1Xvl5P9tbo8MeR1EZOvZDUXZQYBhG64";

	const renderMessage = (props) => {
		const { currentMessage } = props;

		if (currentMessage.user._id === 1) {
			return (
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					<Bubble
						{...props}
						wrapperStyle={{
							right: {
								backgroundColor: "#10A37F",
								marginRight: 12,
								marginVertical: 12,
							},
						}}
						textStyle={{
							right: {
								color: "white",
							},
						}}
					/>
				</View>
			);
		} else {
			return (
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
					}}
				>
					<Image
						source={require("./assets/icon.png")}
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							marginLeft: 8,
						}}
					/>
					<Bubble
						{...props}
						wrapperStyle={{
							left: {
								backgroundColor: "#F7F7F8",
								marginLeft: 12,
							},
						}}
						textStyle={{
							left: {
								color: "black",
							},
						}}
					/>
				</View>
			);
		}

		return <Bubble {...props} />;
	};

	// Implementing chat generation using gpt-3.5-turbo model
	const generateText = async () => {
		setIsTyping(true);
		const message = {
			_id: Math.random().toString(36).substring(7),
			text: inputMessage,
			createdAt: new Date(),
			user: { _id: 1 },
		};

		setMessages((previousMessage) =>
			GiftedChat.append(previousMessage, [message])
		);
		const userMessage = { text: inputMessage, user: true };
		const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const prompt = userMessage.text;
		const result = await model.generateContent(prompt);
		const response = result.response;
		const text = response.text();

		const apiMessage = text;
		setInputMessage("");
		setOutputMessage(apiMessage);

		const newMessage = {
			_id: Math.random().toString(36).substring(7),
			text: apiMessage,
			createdAt: new Date(),
			user: { _id: 2, name: "ChatGPT" },
		};

		setIsTyping(false);
		setMessages((previousMessage) =>
			GiftedChat.append(previousMessage, [newMessage])
		);
	};

	const submitHandler = () => {
		generateText();
	};

	const handleInputText = (text) => {
		setInputMessage(text);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "white",
			}}
		>
			<StatusBar style="auto" />

			<View style={{ flex: 1, justifyContent: "center" }}>
				<GiftedChat
					messages={messages}
					renderInputToolbar={() => {}}
					user={{ _id: 1 }}
					minInputToolbarHeight={0}
					renderMessage={renderMessage}
					isTyping={isTyping}
				/>
			</View>

			<View
				style={{
					flexDirection: "row",
					backgroundColor: "yellow",
					paddingVertical: 8,
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						marginLeft: 10,
						backgroundColor: "#96966a",
						paddingVertical: 8,
						marginHorizontal: 12,
						borderRadius: 12,
						borderColor: "gray",
						borderWidth: 0.2,
					}}
				>
					<TextInput
						value={inputMessage}
						onChangeText={handleInputText}
						placeholder="Enter your question"
						placeholderTextColor="gray"
						style={{
							color: "gray",
							flex: 1,
							paddingHorizontal: 10,
						}}
					/>

					<TouchableOpacity
						onPress={submitHandler}
						style={{
							padding: 6,
							borderRadius: 8,
							marginHorizontal: 12,
						}}
					>
						<FontAwesome name="send-o" color="#10A37F" size={24} />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};
export default GeminiChat;
