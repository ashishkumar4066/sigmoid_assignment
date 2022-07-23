import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
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
const PieChart = ({ pie, bar, table }) => {
	const [pieContent, setPieContent] = useState([]);
	const [pieData, setPieData] = useState({});
	const [barContent, setBarContent] = useState([]);
	const [barData, setBarData] = useState({});
	const [tableData, setTableData] = useState([]);
	useEffect(() => {
		setPieContent(pie);
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
		setBarContent(bar);
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
		<div>
			<Grid
				container
				direction='row'
				justifyContent='space-around'
				alignItems='center'
				spacing={3}
			>
				<Grid item md={4}>
					{pieContent && pieContent.length > 0 && <Pie data={pieData} />}
				</Grid>
				<Grid item md={4}>
					{barContent && barContent.length > 0 && <Bar data={barData} />}
				</Grid>
				<Grid item md={4}>
					{tableData && tableData.length > 0 && (
						<TableData tableData={tableData} />
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
