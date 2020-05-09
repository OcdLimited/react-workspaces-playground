import { createReducer, combineReducers } from '@reduxjs/toolkit';

import { useReducerInjector } from './reducerInjector';
import { buildStore } from '../store';

it('should inject', () => {
	const store = buildStore(
		{
			empty: createReducer(0, {}),
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(i: any) =>
			combineReducers({
				...i,
				empty: createReducer(0, {}),
			}),
	);

	expect(store.getState()).toEqual({
		empty: 0,
	});

	const testReducer = createReducer(0, {
		increment: (state, action) => state + action.payload,
		decrement: (state, action) => state - action.payload,
	});

	useReducerInjector(store).inject('test', testReducer);

	expect(store.getState()).toEqual({
		empty: 0,
		test: 0,
	});

	store.dispatch({
		type: 'increment',
		payload: 10,
	});
	expect(store.getState()).toEqual({
		empty: 0,
		test: 10,
	});

	useReducerInjector(store).inject('test', testReducer);
	expect(store.getState()).toEqual({
		empty: 0,
		test: 10,
	});
});
