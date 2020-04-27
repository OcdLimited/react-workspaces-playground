import { put, takeEvery, all } from 'redux-saga/effects';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* incrementAsync() {
	yield delay(1000);
	yield put({ type: 'counter/increment' });
}

export function* watchIncrementAsync() {
	yield takeEvery('counter/incrementAsyncSaga', incrementAsync);
}

export default function* rootSaga() {
	yield all([watchIncrementAsync()]);
}
