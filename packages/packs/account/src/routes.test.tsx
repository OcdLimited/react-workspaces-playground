import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import AccountRoutes from './routes';

it('renders without crashing', () => {
	const { queryByText } = render(
		<MemoryRouter>
			<Routes>
				<Route path={AccountRoutes.path} element={<AccountRoutes />} />
			</Routes>
		</MemoryRouter>,
	);

	expect(queryByText('Password')).toBeNull();
});

it('renders login without crashing', () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={['/account/login']}>
			<Routes>
				<Route path={AccountRoutes.path} element={<AccountRoutes />} />
			</Routes>
		</MemoryRouter>,
	);

	expect(getByText('Password')).toBeInTheDocument();
});
