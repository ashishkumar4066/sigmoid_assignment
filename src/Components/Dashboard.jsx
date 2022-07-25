import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Button, Grid, Paper, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
// import PieChart from "./PieChart";
import { useSelector } from "react-redux";

//
import { CircularProgress, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pie, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Dashboard = ({ dateRange }) => {
	const reducerState = useSelector((state) => state.reducer);
	// Set Table Data
	const [table, setTable] = useState([]);
	// Set Bar Data
	const [bar, setBar] = useState([]);
	// Set Pie Data
	const [pie, setPie] = useState([]);

	//Loader for Pie
	const [pieLoader, setPieLoader] = useState(null);
	const [barLoader, setBarLoader] = useState(null);
	const [tableLoader, setTableLoader] = useState(null);

	const [open, setOpen] = useState(false);

	const [selectionRange, setSelectionRange] = useState({});
	useEffect(() => {
		let selectionRange = {
			startDate: new Date(parseInt(dateRange.startDate)),
			endDate: new Date(parseInt(dateRange.endDate)),
			key: "selection",
		};
		setSelectionRange(selectionRange);
	}, [dateRange]);

	const handleSelect = (ranges) => {
		console.log(ranges);
		setSelectionRange(ranges.selection);
	};
	const handleClickViewDashboard = () => {
		console.log(selectionRange);
		if (
			Date.parse(selectionRange.startDate).toString() ===
			Date.parse(selectionRange.endDate).toString()
		) {
			console.log("Same date range");
			setOpen(true);
			setPie([]);
			setBar([]);
			setTable([]);
			setPieLoader(null);
			setBarLoader(null);
			setTableLoader(null);
		} else {
			let parsedDate = {
				startDate: Date.parse(selectionRange.startDate).toString(),
				endDate: Date.parse(selectionRange.endDate).toString(),
			};
			console.log(parsedDate);
			fetchTreeData(parsedDate);
			fetchBarData(parsedDate);
			fetchPieData(parsedDate);
		}
	};
	const fetchTreeData = async (parsedDate) => {
		setTableLoader(false);
		let sUrl = "/sigmoid/api/v1/getData";
		let splitUrl = sUrl.split("/");
		sUrl = sUrl.replace(
			"/" + splitUrl[1],
			process.env["REACT_APP_" + splitUrl[1]]
		);
		let oPayload = {
			_id: "dashboard1516252439345",
			emailId: reducerState.email,
			orgViewReq: reducerState.orgViewReq,
			chartObject: {
				metadata: {
					title: "chartobject:1516252439345",
					img_thumbnail: "../img/chart.png",
					chartType: "table",
					dataLimit: 50,
				},
				requestParam: {
					granularity: "hour",
					timeZone: {
						name: "UTC (+00:00)",
						location: "UTC",
					},
					dateRange: parsedDate,
					xAxis: ["D044"],
					yAxis: ["M002"],
					approxCountDistinct: [],
					specialCalculation: [],
					filter: [],
					orderBy: {
						metricOrdByList: [
							{
								id: "M002",
								desc: true,
							},
						],
					},
					percentCalList: [],
				},
			},
		};
		let oHeaders = {
			"x-auth-token": reducerState.logInData.token,
		};

		await axios({
			method: "POST",
			url: sUrl,
			data: oPayload,
			headers: oHeaders,
		})
			.then((res) => res.data)
			.then((data) => {
				setTable(data.result.data);
				setTableLoader(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const fetchBarData = async (parsedDate) => {
		setBarLoader(false);
		let sUrl = "/sigmoid/api/v1/getData";
		let splitUrl = sUrl.split("/");
		sUrl = sUrl.replace(
			"/" + splitUrl[1],
			process.env["REACT_APP_" + splitUrl[1]]
		);
		let oPayload = {
			_id: "dashboard1516252235693",
			emailId: reducerState.email,
			orgViewReq: reducerState.orgViewReq,
			chartObject: {
				metadata: {
					title: "chartobject:1516252235693",
					img_thumbnail: "../img/chart.png",
					chartType: "bar",
					dataLimit: 50,
				},
				requestParam: {
					granularity: "hour",
					timeZone: {
						name: "UTC (+00:00)",
						location: "UTC",
					},
					dateRange: parsedDate,
					xAxis: ["D017"],
					yAxis: ["M002"],
					approxCountDistinct: [],
					specialCalculation: [],
					filter: [],
					orderBy: {
						metricOrdByList: [
							{
								id: "M002",
								desc: true,
							},
						],
					},
					percentCalList: [],
				},
			},
		};
		let oHeaders = {
			"x-auth-token": reducerState.logInData.token,
		};

		await axios({
			method: "POST",
			url: sUrl,
			data: oPayload,
			headers: oHeaders,
		})
			.then((res) => res.data)
			.then((data) => {
				setBar(data.result.data);
				setBarLoader(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const fetchPieData = async (parsedDate) => {
		setPieLoader(false);
		let sUrl = "/sigmoid/api/v1/getData";
		let splitUrl = sUrl.split("/");
		sUrl = sUrl.replace(
			"/" + splitUrl[1],
			process.env["REACT_APP_" + splitUrl[1]]
		);
		let oPayload = {
			_id: "Datastory_ChartId_1535224664111",
			emailId: reducerState.email,
			orgViewReq: reducerState.orgViewReq,
			chartObject: {
				metadata: {
					title: "",
					img_thumbnail: "images/pie.png",
					chartType: "pie",
					dataLimit: 500,
				},
				text: [],
				requestParam: {
					granularity: "hour",
					timeZone: {
						name: "UTC (+00:00)",
						location: "UTC",
					},
					dateRange: parsedDate,
					xAxis: ["D005"],
					yAxis: [],
					approxCountDistinct: [],
					specialCalculation: ["CM001"],
					filter: [],
					orderBy: {
						customMetricOrdByList: [
							{
								id: "CM001",
								desc: true,
							},
						],
					},
					percentCalList: [
						{
							id: "CM001",
						},
					],
				},
			},
		};
		let oHeaders = {
			"x-auth-token": reducerState.logInData.token,
		};

		await axios({
			method: "POST",
			url: sUrl,
			data: oPayload,
			headers: oHeaders,
		})
			.then((res) => res.data)
			.then((data) => {
				setPie(data.result.data);
				setPieLoader(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleClose = () => {
		setOpen(false);
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
	// Pie Content
	let pieContent;
	if (pieLoader === null) {
		pieContent = null;
	} else if (pieLoader) {
		let data = {
			labels: pie.map((p) => p.advertiserId),
			datasets: [
				{
					label: "Pie Chart",
					data: pie.map((p) => p.CM001_percent),
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
		};
		pieContent = (
			<Paper sx={{ padding: "10px" }} elevation={6}>
				<Typography mb={1}>Pie Chart</Typography>
				<Pie data={data} />
			</Paper>
		);
	} else {
		pieContent = <CircularProgress color='secondary' />;
	}
	// Bar Content
	let barContent;
	if (barLoader === null) {
		barContent = null;
	} else if (barLoader) {
		let data = {
			labels: bar.map((b) => b.appSiteId),
			datasets: [
				{
					label: "Bar Graph",
					data: bar.map((b) => b.impressions_offered),
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
		};
		barContent = (
			<Paper sx={{ padding: "10px" }} elevation={6}>
				<Typography mb={1}>Bar Graph</Typography>
				<Bar data={data} />
			</Paper>
		);
	} else {
		barContent = <CircularProgress color='secondary' />;
	}
	// Table Content
	let tableContent;
	if (tableLoader === null) {
		tableContent = null;
	} else if (tableLoader) {
		tableContent = (
			<Paper sx={{ padding: "10px" }} elevation={6}>
				<Typography mb={1}>Table Representation</Typography>
				<TableData tableData={table} />
			</Paper>
		);
	} else {
		tableContent = <CircularProgress color='secondary' />;
	}
	return (
		<div style={{ marginTop: "20px", marginBottom: "20px" }}>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				spacing={4}
			>
				<Grid item>
					{Object.keys(selectionRange).length > 0 && (
						<Paper elevation={4}>
							<DateRangePicker
								minDate={new Date(parseInt(dateRange.startDate))}
								maxDate={new Date(parseInt(dateRange.endDate))}
								ranges={[selectionRange]}
								onChange={(item) => handleSelect(item)}
								rangeColors={["#9c27b0"]}
							/>
						</Paper>
					)}
				</Grid>
				<Grid item>
					<Button
						onClick={handleClickViewDashboard}
						variant='contained'
						color='secondary'
					>
						VIEW DASHBOARD
					</Button>
				</Grid>
			</Grid>
			{open && (
				<Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					message='Invalid date range'
					action={action}
				/>
			)}

			{/* Charts */}
			<div style={{ margin: "0 10%", marginTop: "20px" }}>
				<Grid
					container
					direction='row'
					justifyContent='space-around'
					alignItems='center'
					spacing={3}
				>
					<Grid item md={6}>
						{pieContent}
					</Grid>
					<Grid item md={6}>
						{barContent}
					</Grid>
					<Grid item md={6}>
						{tableContent}
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default Dashboard;
export const TableData = ({ tableData }) => {
	return (
		<TableContainer
			sx={{ height: "400px", overflow: "auto" }}
			component={Paper}
			elevation={4}
		>
			<Table>
				<TableHead>
					<TableRow sx={{ background: "#9c27b0" }}>
						<TableCell sx={{ color: "white", fontWeight: "bold" }}>
							Publisher ID
						</TableCell>
						<TableCell
							sx={{ color: "white", fontWeight: "bold" }}
							align='right'
						>
							Impressions Offered
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map((value, index) => (
						<TableRow
							key={index}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{value.publisherId}
							</TableCell>
							<TableCell align='right'>{value.impressions_offered}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
