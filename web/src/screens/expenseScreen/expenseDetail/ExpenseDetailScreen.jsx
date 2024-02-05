import React, { useEffect, useState } from "react";
import "./ExpenseDetailScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import TextInput from "../../../component/textInput/TextInput";
import { message, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function ExpenseDetailScreen() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { expenseData } = state;
	const [messageApi, contextHolder] = message.useMessage();
	const [purpose, setPurpose] = useState(null);
	const [givenAmount, setGivenAmount] = useState(0);
	const [receivedAmount, setReceivedAmount] = useState(0);
	const [date, setDate] = useState(null);
	dayjs.extend(customParseFormat);

	useEffect(() => {
		setPurpose(expenseData.purpose);
		setFatherName(expenseData.fatherName);
		setRollNo(expenseData.rollNo);
	}, []);

	/** Manually entering any of the following formats will perform date parsing */
	const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

	const handleDatePicker = (value) => {
		setDate(value.$d);
	};
	return <div></div>;
}

export default ExpenseDetailScreen;
