import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useSaga, Mode } from '@ocdlimited/abp.react.redux';
import { AbpAppBar } from '@ocdlimited/abp.react.theme.shared';
import { useNavigate } from 'react-router-dom';
import {
	selectSettings,
	selectMultiTenancy,
	selectCurrentTenant,
	changeCurrentCulture,
	selectLanguages,
	selectCurrentCulture,
} from '@ocdlimited/abp.react.core';

import { login, LoginData, switchTenant } from './loginSlice';
import rootSaga from './loginSagas';

import { LoginPage } from './pages/LoginPage';
import { LoginTopBarActions } from './components';

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

	const languages = useSelector(selectLanguages);
	const currentCulture = useSelector(selectCurrentCulture);

	const [isSelfRegistrationEnabled, enableLocalLogin] = useSelector(
		selectSettings('Abp.Account.IsSelfRegistrationEnabled', 'Abp.Account.EnableLocalLogin'),
	);

	const tenant = useSelector(selectCurrentTenant);

	const multiTenancy = useSelector(selectMultiTenancy);

	/* istanbul ignore next */
	function onTenantChanged(tenant: string) {
		dispatch(switchTenant(tenant));
	}

	/* istanbul ignore next */
	function onLanguageChange(culture: any) {
		dispatch(changeCurrentCulture(culture));
	}

	if (enableLocalLogin?.toLowerCase() !== 'true') {
		return <React.Fragment />;
	}

	const onSubmit = buildOnSubmit(dispatch, navigate);

	return (
		<React.Fragment>
			<AbpAppBar
				noMenu
				barActions={() => (
					<LoginTopBarActions
						onLanguageChange={onLanguageChange}
						languages={languages}
						currentCulture={currentCulture}
					/>
				)}
			/>
			<div className={classes.appBarSpacer} />
			<Container component="main" maxWidth="xs">
				<LoginPage
					isSelfRegistrationEnabled={isSelfRegistrationEnabled?.toLowerCase() === 'true'}
					isMultiTenant={!!multiTenancy}
					tenantName={tenant.name}
					onSubmit={onSubmit}
					onTenantChanged={onTenantChanged}
					autoFocus
				/>
			</Container>
		</React.Fragment>
	);
}

export default LoginContainer;
