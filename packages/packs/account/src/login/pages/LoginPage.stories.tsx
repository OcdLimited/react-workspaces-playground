import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import { LoginPage } from './LoginPage';

export default {
	title: 'Account/Login/Pages/LoginPage',
	component: LoginPage,
};

export const Default = () => <LoginPage isMultiTenant={boolean('isMultiTenant', true)} onSubmit={action('onSubmit')} />;

Default.story = {};
