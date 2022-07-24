import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import PieChart from "./PieChart";

const Dashboard = ({ orgViewReq, email, loggedInData, dateRange }) => {
	// Set Table Data
	const [table, setTable] = useState([]);
	// Set Bar Data
	const [bar, setBar] = useState([]);
	// Set Pie Data
	const [pie, setPie] = useState([]);
	// logged in state
	const [loginData, setLoginData] = useState({});
	useEffect(() => {
		console.log(loggedInData);
		setLoginData(loggedInData);
	}, [loggedInData]);

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
		let parsedDate = {
			startDate: Date.parse(selectionRange.startDate).toString(),
			endDate: Date.parse(selectionRange.endDate).toString(),
		};
		console.log(parsedDate);
		fetchTreeData(parsedDate);
		fetchBarData(parsedDate);
		fetchPieData(parsedDate);
	};
	const fetchTreeData = async (parsedDate) => {
		console.log(parsedDate);

		let sUrl = "/sigmoid/api/v1/getData";
		let splitUrl = sUrl.split("/");
		sUrl = sUrl.replace(
			"/" + splitUrl[1],
			process.env["REACT_APP_" + splitUrl[1]]
		);
		let oPayload = {
			_id: "dashboard1516252439345",
			emailId: email,
			orgViewReq: orgViewReq,
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
			"x-auth-token": loginData.token,
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
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const fetchBarData = async (parsedDate) => {
		let sUrl = "/sigmoid/api/v1/getData";
		let splitUrl = sUrl.split("/");
		sUrl = sUrl.replace(
			"/" + splitUrl[1],
			process.env["REACT_APP_" + splitUrl[1]]
		);
		let oPayload = {
			_id: "dashboard1516252235693",
			emailId: email,
			orgViewReq: orgViewReq,
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
			"x-auth-token": loginData.token,
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
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const fetchPieData = async (parsedDate) => {
		let sUrl = "/sigmoid/api/v1/getData";
		let splitUrl = sUrl.split("/");
		sUrl = sUrl.replace(
			"/" + splitUrl[1],
			process.env["REACT_APP_" + splitUrl[1]]
		);
		let oPayload = {
			_id: "Datastory_ChartId_1535224664111",
			emailId: email,
			orgViewReq: orgViewReq,
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
			"x-auth-token": loginData.token,
		};

		await axios({
			method: "POST",
			url: sUrl,
			data: oPayload,
			headers: oHeaders,
		})
			.then((res) => res.data)
			.then((data) => {
				console.log(data.result.data);
				setPie(data.result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				spacing={4}
			>
				<Grid item>
					{Object.keys(selectionRange).length > 0 && (
						<DateRangePicker
							minDate={new Date(parseInt(dateRange.startDate))}
							maxDate={new Date(parseInt(dateRange.endDate))}
							ranges={[selectionRange]}
							onChange={(item) => handleSelect(item)}
						/>
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
			{pie && pie.length > 0 && bar && bar.length > 0 && (
				<PieChart pie={pie} bar={bar} table={table} />
			)}
		</div>
	);
};

export default Dashboard;
