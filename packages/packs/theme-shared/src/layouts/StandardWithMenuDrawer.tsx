import React, { ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, CssBaseline } from '@material-ui/core';
import { useAuthentication } from '@ocdlimited/abp.react.core';
import { Outlet } from 'react-router-dom';
import { Copyright, AbpAppBar, MenuDrawer } from '../components';

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
	secure?: boolean;
	children: ReactNode[];
}

export function StandardWithMenuDrawer({ secure }: StandardWithMenuDrawerProps) {
	const [showContent] = useAuthentication(secure || false);

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	/* istanbul ignore next */
	const handleDrawerOpen = React.useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	/* istanbul ignore next */
	const handleDrawerClose = React.useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	/* istanbul ignore next */
	if (!showContent) {
		return <></>;
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
