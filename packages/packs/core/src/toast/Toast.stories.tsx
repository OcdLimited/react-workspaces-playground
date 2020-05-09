import React from 'react';
import { select } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import addons from '@storybook/addons';
import withRedux from 'addon-redux/withRedux';
import withReduxEnhancer from 'addon-redux/enhancer';
import { ToastProvider } from 'react-toast-notifications';

import { Notifier, toastReducer, error, success, info, warning } from '.';

export default {
	title: 'Core/Toast',
};

const store = {
	...configureStore({
		reducer: {
			toast: toastReducer,
		},
		enhancers: [withReduxEnhancer],
	}),
	injectedSagas: [],
	runSaga: () => {},
	injectedReducers: [],
};

const withReduxSettings = {
	Provider,
	store,
	actions: [
		{
			name: 'success',
			action: success({
				key: Date.now().toString(),
				message: 'This is a success message',
			}),
		},
		{
			name: 'info',
			action: info({
				key: Date.now().toString(),
				message: 'This is an info message',
			}),
		},
		{
			name: 'warning',
			action: warning({
				key: Date.now().toString(),
				message: 'This is an warning message',
			}),
		},
		{
			name: 'error',
			action: error({
				key: Date.now().toString(),
				message: 'This is an error message',
			}),
		},
	],
};

const withReduxDecorator = withRedux(addons)(withReduxSettings);

export const Default = () => (
	<Provider store={store}>
		<ToastProvider
			placement={select(
				'placement',
				['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right'],
				'top-right',
			)}
		>
			<Notifier />
		</ToastProvider>
	</Provider>
);

Default.story = {
	name: 'Default',
	decorators: [withReduxDecorator],
};
