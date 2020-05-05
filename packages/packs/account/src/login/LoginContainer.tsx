import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useSaga, Mode } from '@ocdlimited/abp.react.redux';
import { AbpAppBar, setCurrentTheme } from '@ocdlimited/abp.react.theme.shared';
import { useNavigate } from 'react-router-dom';
import { changeCurrentCulture } from '@ocdlimited/abp.react.core';

import { login, LoginData, switchTenant, buildSelectLoginSettings } from './loginSlice';
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

	const {
		languages,
		currentCulture,
		isSelfRegistrationEnabled,
		enableLocalLogin,
		tenant,
		multiTenancy,
		availableThemes,
		currentTheme,
	} = useSelector(buildSelectLoginSettings());

	/* istanbul ignore next */
	const onSelectTheme = React.useCallback(
		theme => {
			dispatch(setCurrentTheme(theme));
		},
		[dispatch],
	);

	/* istanbul ignore next */
	const onTenantChanged = React.useCallback(
		tenant => {
			dispatch(switchTenant(tenant));
		},
		[dispatch],
	);

	/* istanbul ignore next */
	const onLanguageChange = React.useCallback(
		culture => {
			dispatch(changeCurrentCulture(culture));
		},
		[dispatch],
	);

	if (!enableLocalLogin) {
		return <React.Fragment />;
	}

	const onSubmit = buildOnSubmit(dispatch, navigate);

	return (
		<React.Fragment>
			<AbpAppBar
				noMenu
				barActions={() => (
					<LoginTopBarActions
						onSelectLanguage={onLanguageChange}
						languages={languages}
						currentCulture={currentCulture}
						onSelectTheme={onSelectTheme}
						themes={availableThemes}
						currentTheme={currentTheme}
					/>
				)}
			/>
			<div className={classes.appBarSpacer} />
			<Container component="main" maxWidth="xs">
				<LoginPage
					isSelfRegistrationEnabled={isSelfRegistrationEnabled}
					isMultiTenant={multiTenancy}
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
