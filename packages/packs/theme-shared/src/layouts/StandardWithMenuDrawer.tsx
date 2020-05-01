import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, CssBaseline } from '@material-ui/core';
import { useAuthentication } from '@ocdlimited/abp.react.core';
import { Copyright, AbpAppBar, MenuDrawer } from '../components';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			display: 'flex',
		},
		content: {
			flexGrow: 1,
			height: '100vh',
			overflow: 'auto',
		},
		appBarSpacer: theme.mixins.toolbar,

		container: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4),
		},
	};
});

interface StandardWithMenuDrawerProps {
	children: any;
	secure?: boolean;
}

export function StandardWithMenuDrawer(props: StandardWithMenuDrawerProps) {
	const [showContent] = useAuthentication(props.secure || false);

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	if (!showContent) {
		return <React.Fragment />;
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AbpAppBar open={open} onOpen={handleDrawerOpen} />
			<MenuDrawer open={open} onClose={handleDrawerClose} />

			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Outlet />
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
}

export default StandardWithMenuDrawer;
