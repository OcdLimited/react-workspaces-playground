import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createReducer } from '@reduxjs/toolkit';

import AccountRoutes from './routes';

jest.mock('./login/loadable.tsx', () => ({
	LoginContainer: () => <div>Password</div>,
}));

const store = {
	...configureStore({
		reducer: createReducer(0, {}),
	}),
	injectedSagas: [],
	runSaga: () => {},
	injectedReducers: [],
};

it('renders without crashing', () => {
	const { queryByText } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Routes>
					<Route path={AccountRoutes.path} element={<AccountRoutes />} />
				</Routes>
			</MemoryRouter>
		</Provider>,
	);

	expect(queryByText('Password')).toBeNull();
});

it('renders login without crashing', async () => {
	const { getByText } = render(
		<Provider store={store}>
			<MemoryRouter initialEntries={['/account/login']}>
				<Routes>
					<Route path={AccountRoutes.path} element={<AccountRoutes />} />
				</Routes>
			</MemoryRouter>
		</Provider>,
	);

	expect(getByText('Password')).toBeInTheDocument();
});
