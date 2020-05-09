import React from 'react';
import { render } from '@testing-library/react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { useBasicTheme, UseThemeOptions } from './useUi';
import reducer from './uiSlice';

const ExampleComponent = ({ options }: { options?: UseThemeOptions }) => {
	useBasicTheme(options);

	return (
		<>
			<h1>title</h1>
		</>
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
	createRootReducer: combineReducers,
};

it('should work', () => {
	render(
		<Provider store={store}>
			<ExampleComponent />
		</Provider>,
	);
});
