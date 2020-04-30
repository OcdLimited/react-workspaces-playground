import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';

import { buildStore } from '@ocdlimited/abp.react.redux';
import { useLocalization } from './useLocalization';

const ExampleComponent = () => {
	useLocalization();
	const { t } = useTranslation();

	return (
		<React.Fragment>
			<h1>{t('title')}</h1>
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

it('should workd', () => {
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
