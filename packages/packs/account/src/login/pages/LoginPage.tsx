import React from 'react';
import { Formik } from 'formik';
import { SignInForm } from '@ocdlimited/abp.react.account';
import AuthService from '../services/authService';

interface LoginData {
	username: string;
	password: string;
}

export function LoginPage() {
	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			onSubmit={async (data: LoginData) => {
				const authService = new AuthService({
					clientId: 'AdsDataSpike_App',
					clientSecret: '1q2w3e*',
					accessTokenUri: 'https://localhost:44367/connect/token',
					authorizationUri: 'https://localhost:44367/connect/authorize',
					redirectUri: 'http://example.com/auth/github/callback',
					scopes: ['AdsDataSpike'],
				});

				const tokenResponse = await authService.login(data.username, data.password);

				if (tokenResponse.success) {
					alert('success');
				} else {
					alert('error');
				}
			}}
		>
			{props => <SignInForm {...props} />}
		</Formik>
	);
}

export default LoginPage;
