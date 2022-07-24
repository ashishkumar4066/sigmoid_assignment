import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import {
	TextField,
	Button,
	Grid,
	Switch,
	Snackbar,
	CircularProgress,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Login = () => {
	// Login state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checked, setChecked] = useState(true);
	const [loader, setLoader] = useState();
	const [loggedInData, setLoggedInData] = useState();
	const [orgViewReq, setOrgViewReq] = useState({});
	const [open, setOpen] = useState(false);
	// Date Range state
	const [dateRange, setDateRange] = useState({});
	const handleChangeSwitch = () => {
		setChecked(!checked);
	};

	const handleSubmit = () => {
		login();
	};
	const login = async () => {
		let validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (email.match(validRegex)) {
			setLoader(false);
			let sUrl = "/sigmoid/signIn";

			let splitUrl = sUrl.split("/");
			sUrl = sUrl.replace(
				"/" + splitUrl[1],
				process.env["REACT_APP_" + splitUrl[1]]
			);
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
		} else {
			setOpen(true);
		}
	};
	const handleClose = () => {
		setOpen(false);
	};
	const fetchDateRange = async (token) => {
		let sUrl = "/sigmoid/api/v1/getDateRange";
		let splitUrl = sUrl.split("/");
		sUrl = sUrl.replace(
			"/" + splitUrl[1],
			process.env["REACT_APP_" + splitUrl[1]]
		);
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
				setDateRange(data.result);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const action = (
		<React.Fragment>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}
			>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);
	let dashBoard;
	if (loader === undefined) {
		dashBoard = null;
	} else if (loader && Object.keys(dateRange).length === 0) {
		dashBoard = <CircularProgress color='secondary' />;
	} else if (loader && loggedInData && dateRange) {
		dashBoard = (
			<Dashboard
				orgViewReq={orgViewReq}
				email={email}
				loggedInData={loggedInData}
				dateRange={dateRange}
			/>
		);
	}
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
			{dashBoard}
			{open && (
				<Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					message='Invalid Email'
					action={action}
				/>
			)}
		</div>
	);
};

export default Login;
