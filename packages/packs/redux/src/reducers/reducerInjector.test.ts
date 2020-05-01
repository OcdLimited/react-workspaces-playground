import { createReducer } from '@reduxjs/toolkit';

import useReducerInjector from './reducerInjector';
import { buildStore } from '../store';

it('should inject', () => {
	const store = buildStore({
		empty: createReducer(0, {}),
	});

	console.log(store.getState());

	expect(store.getState()).toEqual({
		empty: 0,
		api: {
			inflight: 0,
		},
		config: { loaded: false },
		toast: { notifications: [] },
		token: { current: {} },
	});

	const testReducer = createReducer(0, {
		increment: (state, action) => state + action.payload,
		decrement: (state, action) => state - action.payload,
	});

	useReducerInjector(store).inject('test', testReducer);

	expect(store.getState()).toEqual({
		empty: 0,
		test: 0,
		api: {
			inflight: 0,
		},
		config: { loaded: false },
		toast: { notifications: [] },
		token: { current: {} },
	});

	store.dispatch({
		type: 'increment',
		payload: 10,
	});
	expect(store.getState()).toEqual({
		empty: 0,
		test: 10,
		api: {
			inflight: 0,
		},
		config: { loaded: false },
		toast: { notifications: [] },
		token: { current: {} },
	});

	useReducerInjector(store).inject('test', testReducer);
	expect(store.getState()).toEqual({
		empty: 0,
		test: 10,
		api: {
			inflight: 0,
		},
		config: { loaded: false },
		toast: { notifications: [] },
		token: { current: {} },
	});
});
