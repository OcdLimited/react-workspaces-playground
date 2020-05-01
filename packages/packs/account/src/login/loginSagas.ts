import { all, takeEvery, call, put, select, putResolve } from 'redux-saga/effects';
import { DiscoveryService, AuthService } from './services';
import { toastActions, selectAuthSettings, requestAppConfig, recieveToken } from '@ocdlimited/abp.react.core';
import { i18next } from '@ocdlimited/abp.react.core';
import { login, LoginData } from './loginSlice';

interface Action<T> {
	payload: T;
}

export function* performLogin(action: Action<LoginData>) {
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

	var authService = new AuthService(data);

	/* istanbul ignore next */
	const response = yield call(() => authService.login(username, password));

	if (!response.success) {
		yield put(
			toastActions.error({
				key: 'login-error-' + Date.now().toFixed(),
				message: i18next.t('AbpAccount:DefaultErrorMessage'),
			}),
		);

		form.setSubmitting(false);
	} else {
		yield putResolve(recieveToken(response.accessToken));

		yield putResolve(requestAppConfig(true));
		navigate('/');
	}
}

export function* watchLogin() {
	yield takeEvery(login, performLogin);
}

export default function* rootSaga() {
	yield all([watchLogin()]);
}
