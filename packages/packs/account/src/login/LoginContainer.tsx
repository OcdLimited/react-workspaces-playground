import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useSaga, Mode } from '@ocdlimited/abp.react.redux';
import { AbpAppBar } from '@ocdlimited/abp.react.theme.shared';
import { useNavigate } from 'react-router-dom';
import { selectSettings, selectMultiTenancy } from '@ocdlimited/abp.react.core';

import { login, LoginData } from './loginSlice';
import rootSaga from './loginSagas';

import { LoginPage } from './pages/LoginPage';

const useStyles = makeStyles((theme: Theme) => {
	return {
		appBarSpacer: theme.mixins.toolbar,
	};
});

export function buildOnSubmit(dispatch: Dispatch<any>, navigate: any) {
	return (data: LoginData, form: any) => {
		const payload = {
			...data,
			form,
			navigate,
		};
		dispatch(login(payload));
	};
}

export function LoginContainer() {
	useSaga({
		key: 'login',
		saga: rootSaga,
		mode: Mode.ONCE_TILL_UNMOUNT,
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const classes = useStyles();

	const [isSelfRegistrationEnabled, enableLocalLogin] = useSelector(
		selectSettings('Abp.Account.IsSelfRegistrationEnabled', 'Abp.Account.EnableLocalLogin'),
	);

	const multiTenancy = useSelector(selectMultiTenancy);

	if (enableLocalLogin?.toLowerCase() !== 'true') {
		return <React.Fragment />;
	}

	return (
		<React.Fragment>
			<AbpAppBar open={false} onOpen={() => {}} noMenu />
			<div className={classes.appBarSpacer} />
			<Container component="main" maxWidth="xs">
				<LoginPage
					isSelfRegistrationEnabled={!!isSelfRegistrationEnabled}
					isMultiTenant={!!multiTenancy}
					onSubmit={buildOnSubmit(dispatch, navigate)}
					autoFocus
				/>
			</Container>
		</React.Fragment>
	);
}

export default LoginContainer;
