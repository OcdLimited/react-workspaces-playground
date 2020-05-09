import React, { useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';

export function TenancyDialog({
	open,
	onChange,
	onClose,
}: {
	open: boolean;
	tenantName?: string;
	onChange: (value: string) => void;
	onClose: () => void;
}) {
	const { t } = useTranslation();
	const [value, storeValue] = useState('');

	/* istanbul ignore next */
	function changeValue(e: ChangeEvent<HTMLInputElement>) {
		storeValue(e.currentTarget.value);
	}

	const handleClose = () => {
		storeValue('');
		onClose();
	};

	function handleSave() {
		onChange(value);
	}

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="tenant-dialog-title">
			<DialogTitle id="tenant-dialog-title">{t('AbpUiMultiTenancy:SwitchTenant')}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t('AbpUiMultiTenancy:SwitchTenantHint')}</DialogContentText>
				<TextField
					autoFocus
					data-testid="name"
					id="name"
					label={t('AbpUiMultiTenancy:Name')}
					onChange={changeValue}
					fullWidth
					variant="outlined"
					margin="dense"
					color="primary"
					value={value}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="contained" color="primary">
					{t('AbpTenantManagement:Cancel')}
				</Button>
				<Button onClick={handleSave} variant="contained" color="primary">
					{t('AbpTenantManagement:Save')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default TenancyDialog;
