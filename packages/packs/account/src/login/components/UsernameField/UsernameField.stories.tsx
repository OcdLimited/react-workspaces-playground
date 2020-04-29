import React from 'react';
import withFormik from 'storybook-formik';
import { UsernameField } from './UsernameField';

export default {
	title: 'Account/Login/Components/UsernameField',
};

export const Default = () => <UsernameField autoFocus />;

Default.story = {
	name: 'Default',
	decorators: [withFormik],
};

export const Required = () => <UsernameField required></UsernameField>;

Required.story = {
	name: 'Required',
	decorators: [withFormik],
};
