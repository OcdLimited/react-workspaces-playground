import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSaga, Mode } from '@ocdlimited/abp.react.redux';
import { AbpAppBar } from '@ocdlimited/abp.react.theme.shared';
import { useNavigate } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { login, LoginData } from './loginSlice';
import rootSaga from './loginSagas';

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

	return (
		<React.Fragment>
			<AbpAppBar open={false} onOpen={() => {}} noMenu />
			<div className={classes.appBarSpacer} />
			<LoginPage onSubmit={buildOnSubmit(dispatch, navigate)} />;
		</React.Fragment>
	);
}

export default LoginContainer;
