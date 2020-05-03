import { all, takeEvery, put, select } from 'redux-saga/effects';
import { changeCurrentCulture, requestAppConfig, selectIsAuthenticated } from './appConfigSlice';

export function* performCurrentCultureChange(action: any) {
	const secured = yield select(selectIsAuthenticated);
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
