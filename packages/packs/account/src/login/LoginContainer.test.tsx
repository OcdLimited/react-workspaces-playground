import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createReducer } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginContainer, buildOnSubmit } from '.';

const store = {
	...configureStore({
		reducer: createReducer(0, {
			enviroment: {},
		}),
	}),
	injectedSagas: [],
	runSaga: () => {},
	injectedReducers: [],
};

it('renders without crashing', () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginContainer />
			</MemoryRouter>
		</Provider>,
	);
});

it('can submit', () => {
	const dispatch = jest.fn();

	buildOnSubmit(dispatch, {})({}, {});

	expect(dispatch).toBeCalled();
});

it('snapshot', () => {
	const { container } = render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginContainer />
			</MemoryRouter>
		</Provider>,
	);
	expect(container).toMatchSnapshot();
});
