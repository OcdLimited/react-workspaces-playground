import { all, takeEvery, put, select } from 'redux-saga/effects';
import { changeCurrentCulture, requestAppConfig, buildSelectIsAuthenticated } from './appConfigSlice';

export function* performCurrentCultureChange(action: any) {
	const secured = yield select(buildSelectIsAuthenticated());
	yield put(
		requestAppConfig(secured, null, null, {
			'Accept-Language': action.payload.cultureName,
		}),
	);
}

export function* watchCurrentCultureChange() {
	yield takeEvery(changeCurrentCulture, performCurrentCultureChange);
}

export default function* rootSaga() {
	yield all([watchCurrentCultureChange()]);
}
