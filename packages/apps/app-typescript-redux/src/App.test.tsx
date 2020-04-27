import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import App from './App';

it('renders', () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>,
	);
});
