import React from 'react';
import { Formik } from 'formik';
import { LoginForm } from '@ocdlimited/abp.react.account';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export function LoginPage({ onSubmit }: any) {
	var { t } = useTranslation('AbpAccount');

	const loginSchema = Yup.object().shape({
		username: Yup.string().required(t('The {0} field is required.').replace('{0}', t('DisplayName:Username'))),
		password: Yup.string().required(t('The {0} field is required.').replace('{0}', t('DisplayName:Password'))),
	});
	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			validationSchema={loginSchema}
			onSubmit={onSubmit}
		>
			{props => <LoginForm {...props} />}
		</Formik>
	);
}

export default LoginPage;
