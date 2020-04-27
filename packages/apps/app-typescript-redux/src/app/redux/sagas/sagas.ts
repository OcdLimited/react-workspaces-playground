import { all } from 'redux-saga/effects';

export function* helloSaga() {
	yield;
}

export default function* rootSaga() {
	//yield all([helloSaga()]);
}
