import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { buildStore } from '@ocdlimited/abp.react.redux';

import { AbpAppBar } from './AbpAppBar';

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

it('should render', () => {
	render(
		<Provider store={buildStore({}, state)}>
			<AbpAppBar open onOpen={jest.fn()} />
		</Provider>,
	);
});
