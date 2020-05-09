import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createReducer } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginContainer, buildOnSubmit } from '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: any = {};

beforeEach(() => {
	store = {
		...configureStore({
			reducer: {
				config: createReducer(
					{
						setting: {
							values: {
								'Abp.Account.IsSelfRegistrationEnabled': 'true',
								'Abp.Account.EnableLocalLogin': 'true',
							},
						},
					},
					{},
				),
				ui: createReducer(
					{
						currentTheme: 'test',
						availableThemes: ['test'],
					},
					{},
				),
			},
		}),
		injectedSagas: [],
		runSaga: () => {},
		injectedReducers: [],
	};
});

it('renders without crashing', () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginContainer />
			</MemoryRouter>
		</Provider>,
	);
});

it('renders tenacy selector', () => {
	store = {
		...configureStore({
			reducer: {
				config: createReducer(
					{
						setting: {
							values: {
								'Abp.Account.IsSelfRegistrationEnabled': 'true',
								'Abp.Account.EnableLocalLogin': 'true',
							},
						},
						multiTenancy: {
							isEnabled: true,
						},
					},
					{},
				),
				ui: createReducer(
					{
						currentTheme: 'test',
						availableThemes: ['test'],
					},
					{},
				),
			},
		}),
		injectedSagas: [],
		runSaga: () => {},
		injectedReducers: [],
	};
	const { getByText } = render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginContainer />
			</MemoryRouter>
		</Provider>,
	);

	expect(getByText(/Tenant/i)).toBeInTheDocument();
});

it('disabled when EnableLocalLogin is false', () => {
	store = {
		...configureStore({
			reducer: {
				config: createReducer(
					{
						setting: {
							values: {
								'Abp.Account.IsSelfRegistrationEnabled': 'true',
								'Abp.Account.EnableLocalLogin': 'false',
							},
						},
						multiTenancy: {
							isEnabled: true,
						},
					},
					{},
				),
				ui: createReducer(
					{
						currentTheme: 'test',
						availableThemes: ['test'],
					},
					{},
				),
			},
		}),
		injectedSagas: [],
		runSaga: () => {},
		injectedReducers: [],
	};
	const { queryByText } = render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginContainer />
			</MemoryRouter>
		</Provider>,
	);

	expect(queryByText(/Tenant/i)).not.toBeInTheDocument();
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
