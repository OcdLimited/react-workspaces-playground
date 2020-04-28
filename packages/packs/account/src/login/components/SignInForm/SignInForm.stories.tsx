import React from 'react';
import withFormik from 'storybook-formik';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { SignInForm } from './SignInForm';

export default {
	title: 'Account/Login/Components/SignInForm',
};

export const Text = () => <SignInForm isSelfRegistrationEnabled={boolean('isSelfRegistrationEnabled', true)} />;

Text.story = {
	name: 'Default',
	decorators: [withFormik, withKnobs],
};
