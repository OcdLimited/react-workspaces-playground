import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { useTenant } from './useTenant';
import reducer from './tenantSlice';

const ExampleComponent = () => {
	useTenant();

	return (
		<React.Fragment>
			<h1>title</h1>
		</React.Fragment>
	);
};
const store = {
	...configureStore({
		reducer: {
			tenant: reducer,
		},
	}),
	injectedSagas: [],
	runSaga: () => {},
	injectedReducers: [],
};

it('should work', () => {
	render(
		<Provider store={store}>
			<ExampleComponent />
		</Provider>,
	);
});
