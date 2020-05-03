import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, Grid, Button, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { TenancyDialog } from './TenancyDialog';

const useStyles = makeStyles(theme => ({
	paper: {
		flexGrow: 1,
		marginTop: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
	},
	switch: {
		display: 'flex',
	},
}));

export function TenancyBox({
	visible,
	tenantName,
	onTenantChanged,
}: {
	visible?: boolean;
	tenantName?: string | undefined | null;
	onTenantChanged?: any;
}) {
	const classes = useStyles();
	const { t } = useTranslation('AbpUiMultiTenancy');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, [setOpen, tenantName]);

	if (!visible) return <React.Fragment />;

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Paper elevation={2} className={classes.paper}>
			<TenancyDialog data-testid="dialog" open={open} onChange={onTenantChanged} onClose={handleClose} />

			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Typography component="h3" variant="h5">
						{t('Tenant')}
					</Typography>
				</Grid>
				<Grid item xs={(onTenantChanged && 6) || 12}>
					<Box>{tenantName || t('NotSelected')}</Box>
				</Grid>
				{onTenantChanged && (
					<Grid item container xs={6} justify="flex-end" className={classes.switch}>
						<Button variant="contained" color="secondary" onClick={handleOpen}>
							{t('Switch')}
						</Button>
					</Grid>
				)}
			</Grid>
		</Paper>
	);
}

TenancyBox.defaultProps = {};

export default TenancyBox;
