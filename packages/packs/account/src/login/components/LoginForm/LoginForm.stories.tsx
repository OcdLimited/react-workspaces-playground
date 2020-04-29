import React from 'react';
import withFormik from 'storybook-formik';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { LoginForm } from './LoginForm';

export default {
	title: 'Account/Login/Components/LoginForm',
};

export const Text = () => <LoginForm isSelfRegistrationEnabled={boolean('isSelfRegistrationEnabled', true)} />;

Text.story = {
	name: 'Default',
	decorators: [withFormik, withKnobs],
};
