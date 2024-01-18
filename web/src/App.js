import "./App.css";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { Route, Routes } from "react-router-dom";
import PageNavigator from "./screens/PageNavigator";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<LoginScreen />} />
				<Route path="/PageNavigator" element={<PageNavigator />} />
			</Routes>
		</>
	);
}

export default App;
