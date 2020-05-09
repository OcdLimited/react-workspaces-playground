import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setConfig } from '@ocdlimited/abp.react.core';
import { store } from './app/redux/store';

import App from './App';

it('renders loading', () => {
	const { container } = render(
		<Provider store={store}>
			<App />
		</Provider>,
	);

	expect(container).toMatchSnapshot();
});

it('renders fully', () => {
	store.dispatch(
		setConfig({
			currentUser: {
				isAuthenticated: true,
			},
		}),
	);

	const { container, getAllByText } = render(
		<Provider store={store}>
			<App />
		</Provider>,
	);

	expect(getAllByText(/Dashboard/i).length).toBeGreaterThan(0);

	expect(container).toMatchSnapshot();
});
