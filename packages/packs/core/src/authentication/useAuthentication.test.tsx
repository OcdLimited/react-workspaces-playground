import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { buildStore } from '@ocdlimited/abp.react.redux';
import { useAuthentication } from './useAuthentication';

const ExampleComponent = ({ secure }: any) => {
	useAuthentication(secure);

	return (
		<React.Fragment>
			<h1>title</h1>
		</React.Fragment>
	);
};

const state = {
	config: {
		localization: {
			values: {
				title: 'Title!',
			},
			currentCulture: {
				cultureName: 'en',
			},
		},
	},
};

it('secured should work', () => {
	render(
		<Provider store={buildStore({}, state)}>
			<MemoryRouter initialEntries={['/home']}>
				<ExampleComponent secure />
			</MemoryRouter>
		</Provider>,
	);
});

it('unsecured should work', () => {
	render(
		<Provider store={buildStore({}, state)}>
			<MemoryRouter>
				<ExampleComponent />
			</MemoryRouter>
		</Provider>,
	);
});
