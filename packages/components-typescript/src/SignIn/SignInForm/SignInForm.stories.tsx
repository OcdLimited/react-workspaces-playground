import React from 'react';
import withFormik from 'storybook-formik';
import { SignInForm } from './SignInForm';

export default {
	title: 'SignIn/SignInForm',
};

export const Text = () => <SignInForm />;

Text.story = {
	name: 'Default',
	decorators: [withFormik],
};
