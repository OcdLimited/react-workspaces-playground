import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { use{{properCase name}} } from './use{{properCase name}}';
import reducer from './{{camelCase name}}Slice'

const ExampleComponent = () => {
	use{{properCase name}}();

	return (
		<React.Fragment>
			<h1>title</h1>
		</React.Fragment>
	);
};
const store = {
	...configureStore({
		reducer: {
			{{camelCase name}}: reducer,
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
