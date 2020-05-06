import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { useBasicTheme, UseThemeOptions } from './useUi';
import reducer from './uiSlice';

const ExampleComponent = ({ options }: { options?: UseThemeOptions }) => {
	useBasicTheme(options);

	return (
		<React.Fragment>
			<h1>title</h1>
		</React.Fragment>
	);
};

const store = {
	...configureStore({
		reducer: {
			ui: reducer,
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
