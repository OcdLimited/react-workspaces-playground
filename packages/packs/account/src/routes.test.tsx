import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import AccountRoutes from './routes';

it('renders without crashing', () => {
	render(
		<MemoryRouter>
			<Routes>
				<Route path={AccountRoutes.path} element={<AccountRoutes />} />
			</Routes>
		</MemoryRouter>,
	);
});

it('renders login without crashing', () => {
	render(
		<MemoryRouter initialEntries={['/account/login']}>
			<Routes>
				<Route path={AccountRoutes.path} element={<AccountRoutes />} />
			</Routes>
		</MemoryRouter>,
	);
});

it('snapshot', () => {
	const { container } = render(
		<MemoryRouter>
			<Routes>
				<Route path={AccountRoutes.path} element={<AccountRoutes />} />
			</Routes>
		</MemoryRouter>,
	);
	expect(container).toMatchSnapshot();
});
