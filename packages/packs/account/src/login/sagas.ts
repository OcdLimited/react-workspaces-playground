import { all, takeEvery, call } from 'redux-saga/effects';
import { login, LoginData } from './loginSlice';
import { DiscoveryService, AuthService } from './services';

interface Action<T> {
	payload: T;
}

export function* performLogin(action: Action<LoginData>) {
	const { username, password, form, navigate } = action.payload;

	const discoveryService = new DiscoveryService({
		issuer: 'https://localhost:44367',
		scopes: ['AdsDataSpike'],
		clientId: 'AdsDataSpike_App',
		clientSecret: '1q2w3e*',
	});

	/* istanbul ignore next */
	const data = yield call(() => discoveryService.getDiscovery());

	var authService = new AuthService(data);

	/* istanbul ignore next */
	const response = yield call(() => authService.login(username, password));

	if (!response.success) {
		console.log('error');

		form.setSubmitting(false);
	} else {
		console.log('success');
		navigate('/');
	}
}

export function* watchLogin() {
	yield takeEvery(login, performLogin);
}

export default function* rootSaga() {
	yield all([watchLogin()]);
}
