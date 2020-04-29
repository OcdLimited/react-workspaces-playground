import React from 'react';
import { action } from '@storybook/addon-actions';

import { LoginPage } from './LoginPage';

export default {
	title: 'Account/Login/Pages/LoginPage',
	component: LoginPage,
};

export const Default = () => <LoginPage onSubmit={action('onSubmit')} />;

Default.story = {};
