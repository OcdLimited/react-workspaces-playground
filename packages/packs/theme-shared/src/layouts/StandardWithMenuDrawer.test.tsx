import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { StandardWithMenuDrawer } from './StandardWithMenuDrawer';
import { configureStore, createReducer } from '@reduxjs/toolkit';

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
