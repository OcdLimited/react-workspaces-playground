import { all } from 'redux-saga/effects';

export function* helloSaga() {
	console.log('Hello Sagas!');
	yield;
}

export default function* rootSaga() {
	yield all([helloSaga()]);
}
