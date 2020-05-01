import React, { SyntheticEvent } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import addons from '@storybook/addons';
import withRedux from 'addon-redux/withRedux';
import withReduxEnhancer from 'addon-redux/enhancer';
import { configureStore, createReducer } from '@reduxjs/toolkit';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import { StandardWithMenuDrawer } from './StandardWithMenuDrawer';
import { Chart } from '../components';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Title } from '../components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Generate Order Data
function createData(id: number, date: string, name: string, shipTo: string, paymentMethod: string, amount: number) {
	return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
	createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
	createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
	createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
	createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
	createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function Orders() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Title>Recent Orders</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Ship To</TableCell>
						<TableCell>Payment Method</TableCell>
						<TableCell align="right">Sale Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.shipTo}</TableCell>
							<TableCell>{row.paymentMethod}</TableCell>
							<TableCell align="right">{row.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className={classes.seeMore}>
				<Link color="primary" href="#" onClick={preventDefault}>
					See more orders
				</Link>
			</div>
		</React.Fragment>
	);
}

function preventDefault(event: SyntheticEvent) {
	event.preventDefault();
}

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
	depositContext: {
		flex: 1,
	},
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

function Deposits() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Title>Recent Deposits</Title>
			<Typography component="p" variant="h4">
				$3,024.00
			</Typography>
			<Typography color="textSecondary" className={classes.depositContext}>
				on 15 March, 2019
			</Typography>
			<div>
				<Link color="primary" href="#" onClick={preventDefault}>
					View balance
				</Link>
			</div>
		</React.Fragment>
	);
}

const store = {
	...configureStore({
		reducer: {
			test: createReducer({}, {}),
			config: createReducer({}, {}),
		},
		enhancers: [withReduxEnhancer],
	}),
	injectedSagas: [],
	runSaga: () => {},
	injectedReducers: [],
};

const withReduxSettings = {
	Provider,
	store,
	actions: [],
};
const withReduxDecorator = withRedux(addons)(withReduxSettings);

export default {
	title: 'Shared Theme/Layouts/StandardWithMenuDrawer',
};

const Demo = () => {
	const classes = useStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12} md={8} lg={9}>
					<Paper className={fixedHeightPaper}>
						<Chart />
					</Paper>
				</Grid>

				<Grid item xs={12} md={4} lg={3}>
					<Paper className={fixedHeightPaper}>
						<Deposits />
					</Paper>
				</Grid>

				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Orders />
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export const Default = () => (
	<MemoryRouter initialEntries={['/home']}>
		<Routes>
			<StandardWithMenuDrawer>
				<Route element={<Demo />} path="/home" />
			</StandardWithMenuDrawer>
		</Routes>
	</MemoryRouter>
);

Default.story = {
	name: 'Default',
	decorators: [withReduxDecorator],
};
