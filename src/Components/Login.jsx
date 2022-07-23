import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
// import CircularProgress from "@mui/material/CircularProgress";
import { TextField, Button, Grid, Switch } from "@mui/material";

const Login = () => {
	// Login state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checked, setChecked] = useState(true);
	const [loader, setLoader] = useState(false);
	const [loggedInData, setLoggedInData] = useState();
	const [orgViewReq, setOrgViewReq] = useState({});
	// Date Range state
	const [dateRange, setDateRange] = useState();

	const handleChangeSwitch = () => {
		setChecked(!checked);
	};

	const handleSubmit = () => {
		console.log(email + " " + password + " " + checked);
		login();
	};
	const login = async () => {
		setLoader(false);
		const sUrl = "/sigmoid/signIn";

		// let oPayload = {
		// 	email: "candidate@sigmoid.com",
		// 	password: "Sigmoid#123",
		// 	rememberMe: true,
		// };
		let oPayload = {
			email: email,
			password: password,
			rememberMe: checked,
		};
		await axios({
			method: "POST",
			url: sUrl,
			data: oPayload,
		})
			.then((res) => res.data)
			.then((data) => {
				setLoggedInData(data);
				setLoader(true);
				fetchDateRange(data.token);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const fetchDateRange = async (token) => {
		const sUrl = "/sigmoid/api/v1/getDateRange";

		let oPayload = {
			organization: "DemoTest",
			view: "Auction",
		};
		setOrgViewReq(oPayload);
		let oHeaders = {
			"x-auth-token": token,
		};

		await axios({
			method: "POST",
			url: sUrl,
			data: oPayload,
			headers: oHeaders,
		})
			.then((res) => res.data)
			.then((data) => {
				console.log(data);
				setDateRange(data.result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			{!loader && (
				<div>
					<h1> Login </h1>
					<Grid
						container
						direction='column'
						justifyContent='center'
						alignItems='center'
						spacing={3}
					>
						<Grid item>
							<TextField
								label='Email'
								type='text'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item>
							<TextField
								label='Password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item>
							<Switch
								checked={checked}
								onChange={handleChangeSwitch}
								inputProps={{ "aria-label": "controlled" }}
							/>
						</Grid>
						<Grid item>
							<Button
								onClick={handleSubmit}
								variant='contained'
								color='secondary'
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</div>
			)}

			{loader && loggedInData && dateRange ? (
				<Dashboard
					orgViewReq={orgViewReq}
					email={email}
					loggedInData={loggedInData}
					dateRange={dateRange}
				/>
			) : null}
		</div>
	);
};

export default Login;
