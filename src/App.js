import "./App.css";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<Login />
			</div>
		</Provider>
	);
}

export default App;
