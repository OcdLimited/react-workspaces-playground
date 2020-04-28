import React from 'react';
import { Formik } from 'formik';
import { LoginForm } from '@ocdlimited/abp.react.account';
//import AuthService from '../services/authService';

interface LoginData {
	username: string;
	password: string;
}

export function LoginPage({ onSubmit }: any) {
	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			onSubmit={onSubmit}
		>
			{props => <LoginForm {...props} />}
		</Formik>
	);
}

export default LoginPage;
