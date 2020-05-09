import React from 'react';
import { render, act } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import reducer, { enqueue, close } from './toastSlice';
import { Notifier } from './Notifier';

jest.mock('react-toast-notifications', () => ({
	useToasts: jest.fn().mockImplementation(() => ({
		addToast: jest.fn(),
	})),
}));

beforeEach(() => {
	(useToasts as jest.Mock).mockClear();
});

const store = {
	...configureStore({
		reducer: {
			toast: reducer,
		},
	}),
	injectedSagas: [],
	runSaga: () => {},
	injectedReducers: [],
};

it('should render', () => {
	render(
		<Provider store={store}>
			<Notifier />
		</Provider>,
	);
});

it('should render message', () => {
	const addToast = jest.fn();
	const removeToast = jest.fn();

	(useToasts as jest.Mock).mockImplementation(() => ({
		addToast,
		removeToast,
	}));

	act(() => {
		store.dispatch(
			enqueue({
				key: 'test',
			}),
		);

		store.dispatch(
			enqueue({
				key: 'test2',
			}),
		);

		store.dispatch(
			enqueue({
				key: 'test',
			}),
		);

		render(
			<Provider store={store}>
				<Notifier />
			</Provider>,
		);
	});

	expect(addToast).toBeCalledTimes(2);

	act(() => {
		addToast.mock.calls[0][1].onDismiss('test2');

		store.dispatch(
			close({
				key: 'test',
			}),
		);

		render(
			<Provider store={store}>
				<Notifier />
			</Provider>,
		);
	});

	expect(removeToast).toBeCalled();
});
