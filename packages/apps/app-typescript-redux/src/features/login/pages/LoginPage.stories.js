import React from 'react';
import { Provider } from 'react-redux';
import addons from '@storybook/addons';
import withRedux from 'addon-redux/withRedux';

import { store } from '../../../app/store';

import { LoginPage } from './LoginPage';

const withReduxSettings = {
	Provider,
	store,
};

const withReduxDecorator = withRedux(addons)(withReduxSettings);

export default {
	title: 'Features/Login/Pages/LoginPage',
	component: LoginPage,
};

export const Default = () => <LoginPage />;

Default.story = {
	decorators: [withReduxDecorator],
};
