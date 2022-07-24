import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
const PieChart = ({ pieLoader, barLoader, treeLoader, pie, bar, table }) => {
	const [pieData, setPieData] = useState({});
	const [barData, setBarData] = useState({});
	const [tableData, setTableData] = useState([]);
	// Loader for charts
	const [loaderPie, setLoaderPie] = useState();
	const [loaderBar, setLoaderBar] = useState();
	const [loaderTree, setLoaderTree] = useState();

	useEffect(() => {
		console.log(pieLoader);
		setLoaderPie(pieLoader);
	}, [pieLoader]);
	useEffect(() => {
		setLoaderBar(barLoader);
	}, [barLoader]);
	useEffect(() => {
		setLoaderTree(treeLoader);
	}, [treeLoader]);

	useEffect(() => {
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
		setPieData(data);
	}, [pie]);

	useEffect(() => {
		let data = {
			labels: bar.map((b) => b.appSiteId),
			datasets: [
				{
					label: "Bar Chart",
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
		setBarData(data);
	}, [bar]);
	useEffect(() => {
		setTableData(table);
	}, [table]);

	return (
		<div style={{ margin: "0 10%", marginTop: "20px" }}>
			<Grid
				container
				direction='row'
				justifyContent='space-around'
				alignItems='center'
				spacing={3}
			>
				<Grid item md={6}>
					{loaderPie ? (
						<Pie data={pieData} />
					) : (
						<CircularProgress color='secondary' />
					)}
				</Grid>
				<Grid item md={6}>
					{loaderBar ? (
						<Bar data={barData} />
					) : (
						<CircularProgress color='secondary' />
					)}
				</Grid>
				<Grid item md={6}>
					{loaderTree ? (
						<TableData tableData={tableData} />
					) : (
						<CircularProgress color='secondary' />
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default PieChart;

export const TableData = ({ tableData }) => {
	return (
		<TableContainer
			sx={{ height: "400px", overflow: "auto" }}
			component={Paper}
		>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Publisher ID</TableCell>
						<TableCell align='right'>Impressions Offered</TableCell>
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
