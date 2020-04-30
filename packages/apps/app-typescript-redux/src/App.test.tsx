import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import App from './App';
import { setConfig } from '@ocdlimited/abp.react.core';

it('renders loading', () => {
	const { container } = render(
		<Provider store={store}>
			<App />
		</Provider>,
	);

	expect(container).toMatchSnapshot();
});

it('renders fully', () => {
	store.dispatch(setConfig({}));

	const { container, getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>,
	);

	expect(getByText(/ocd/i)).toBeInTheDocument();

	expect(container).toMatchSnapshot();
});
