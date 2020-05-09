import React from 'react';
import { render } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';

import { buildStore } from '@ocdlimited/abp.react.redux';
import { useLocalization } from './useLocalization';

const ExampleComponent = () => {
	useLocalization();
	const { t } = useTranslation();

	return (
		<>
			<h1>{t('title')}</h1>
		</>
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

it('should work', () => {
	render(
		<Provider store={buildStore({}, state)}>
			<ExampleComponent />
		</Provider>,
	);
});

it('no data should work', () => {
	render(
		<Provider store={buildStore({}, {})}>
			<ExampleComponent />
		</Provider>,
	);
});
