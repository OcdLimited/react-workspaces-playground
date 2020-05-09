import { all, takeEvery, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { changeCurrentCulture, requestAppConfig, buildSelectIsAuthenticated } from './appConfigSlice';

export function* performCurrentCultureChange(action: PayloadAction<{ cultureName: string }>) {
	const secured = yield select(buildSelectIsAuthenticated());
	yield put(
		requestAppConfig(secured, undefined, undefined, {
			'Accept-Language': action.payload.cultureName,
		}),
	);
}

export function* watchCurrentCultureChange() {
	yield takeEvery(changeCurrentCulture.toString(), performCurrentCultureChange);
}

export default function* rootSaga() {
	yield all([watchCurrentCultureChange()]);
}
