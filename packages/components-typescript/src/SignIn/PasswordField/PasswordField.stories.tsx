import React from 'react';
import withFormik from 'storybook-formik';
import { PasswordField } from './PasswordField';

export default {
	title: 'SignIn/PasswordField',
};

export const Default = () => <PasswordField />;

Default.story = {
	name: 'Default',
	decorators: [withFormik],
};

export const Required = () => <PasswordField required></PasswordField>;

Required.story = {
	name: 'Required',
	decorators: [withFormik],
};
