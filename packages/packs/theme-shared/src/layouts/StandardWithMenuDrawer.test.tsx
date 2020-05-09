import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { configureStore, createReducer, combineReducers } from '@reduxjs/toolkit';
import { StandardWithMenuDrawer } from './StandardWithMenuDrawer';

const store = {
	...configureStore({
		reducer: {
			test: createReducer({}, {}),
			config: createReducer({}, {}),
		},
	}),
	injectedSagas: [],
	runSaga: () => {},
	injectedReducers: [],
	createRootReducer: combineReducers,
};

it('should render', () => {
	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={['/home']}>
				<StandardWithMenuDrawer>
					<h1>Content</h1>
				</StandardWithMenuDrawer>
			</MemoryRouter>
		</Provider>,
	);
});
