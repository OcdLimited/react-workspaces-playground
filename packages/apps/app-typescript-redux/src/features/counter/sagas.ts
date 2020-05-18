import { put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementByAmount, incrementAsync } from './counterSlice';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* performIncrementAsync(action: PayloadAction<number>) {
	yield delay(1000);
	yield put(incrementByAmount(action.payload));
}

export function* watchIncrementAsync() {
	yield takeEvery(incrementAsync, performIncrementAsync);
}

export default function* rootSaga() {
	yield all([watchIncrementAsync()]);
}
