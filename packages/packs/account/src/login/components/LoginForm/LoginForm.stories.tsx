import React from 'react';
import withFormik from 'storybook-formik';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Container } from '@material-ui/core';
import { LoginForm } from './LoginForm';

export default {
	title: 'Account/Login/Components/LoginForm',
};

export const Text = () => (
	<Container>
		<LoginForm isSelfRegistrationEnabled={boolean('isSelfRegistrationEnabled', true)} />
	</Container>
);

Text.story = {
	name: 'Default',
	decorators: [withFormik, withKnobs],
};
