import { all, takeEvery, call, put, select, putResolve } from 'redux-saga/effects';
import {
	toastActions,
	selectAuthSettings,
	requestAppConfig,
	recieveToken,
	clearTenant,
	buildSelectCurrentTenant,
	i18next,
} from '@ocdlimited/abp.react.core';

import { DiscoveryService, AuthService } from './services';
import { login, switchTenant, requestChangeTenant, LoginPayload } from './loginSlice';

interface Action<T> {
	payload: T;
}

export function* performLogin(action: Action<LoginPayload>) {
	const { username, password, form, navigate } = action.payload;

	const settings = yield select(selectAuthSettings);

	const discoveryService = new DiscoveryService({
		issuer: settings.issuer,
		scopes: [settings.scope],
		clientId: settings.clientId,
		clientSecret: settings.dummyClientSecret,
	});

	/* istanbul ignore next */
	const data = yield call(() => discoveryService.getDiscovery());

	const authService = new AuthService(data);

	const tenant = yield select(buildSelectCurrentTenant());

	/* istanbul ignore next */
	const response = yield call(() => authService.login(username, password, tenant.id));

	if (!response.success) {
		yield put(
			toastActions.error({
				key: `login-error-${Date.now().toFixed()}`,
				message: i18next.t('AbpAccount:DefaultErrorMessage'),
			}),
		);

		form.setSubmitting(false);
	} else {
		yield putResolve(recieveToken(response.accessToken));

		yield putResolve(requestAppConfig(true));
		navigate('/home');
	}
}

export function* performSwitchTenant(action: Action<string>) {
	const tenantName = action.payload;

	if (!tenantName) {
		yield putResolve(clearTenant());
	} else {
		yield putResolve(requestChangeTenant(tenantName));
	}

	yield putResolve(requestAppConfig(false));
}

export function* watchLogin() {
	yield takeEvery(login, performLogin);
}

export function* watchSwitchTenant() {
	yield takeEvery(switchTenant, performSwitchTenant);
}

export default function* rootSaga() {
	yield all([watchLogin(), watchSwitchTenant()]);
}
