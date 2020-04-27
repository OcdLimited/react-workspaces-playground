import { createReducer } from '@reduxjs/toolkit';

import sagaInjector, { Mode } from './sagaInjector';
import { buildStore } from '../store';

export function* helloSaga() {
	yield;
}
export function* helloSaga2() {
	yield;
}

it(Mode.DAEMON, () => {
	const store = buildStore({
		empty: createReducer(0, {}),
	});

	const desc = {
		key: 'test',
		saga: helloSaga,
		mode: Mode.DAEMON,
	};

	sagaInjector(store).inject(desc.key, desc);
	sagaInjector(store).eject(desc.key);
	sagaInjector(store).inject(desc.key, desc);
	sagaInjector(store).inject(desc.key, {
		...desc,
		saga: helloSaga2,
	});
});

it(Mode.ONCE_TILL_UNMOUNT, () => {
	const store = buildStore({
		empty: createReducer(0, {}),
	});

	const desc = {
		key: 'test',
		saga: helloSaga,
		mode: Mode.ONCE_TILL_UNMOUNT,
	};

	sagaInjector(store).inject(desc.key, desc);
	sagaInjector(store).eject(desc.key);
	sagaInjector(store).inject(desc.key, desc);
	sagaInjector(store).inject(desc.key, {
		...desc,
		saga: helloSaga2,
	});
});

it(Mode.RESTART_ON_REMOUNT, () => {
	const store = buildStore({
		empty: createReducer(0, {}),
	});

	const desc = {
		key: 'test',
		saga: helloSaga,
		mode: Mode.RESTART_ON_REMOUNT,
	};

	sagaInjector(store).inject(desc.key, desc);
	sagaInjector(store).eject(desc.key);
	sagaInjector(store).inject(desc.key, desc);
	sagaInjector(store).inject(desc.key, {
		...desc,
		saga: helloSaga2,
	});
});
