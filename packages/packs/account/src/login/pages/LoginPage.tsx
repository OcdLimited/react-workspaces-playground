/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TenancyBox, LoginForm } from '../components';
import { LoginData } from '../loginSlice';

interface LoginPageProps {
	onSubmit: (data: LoginData, form: FormikHelpers<LoginData>) => void;
	isMultiTenant: boolean;
	isSelfRegistrationEnabled: boolean;
	autoFocus: boolean;
	onTenantChanged: (value: string) => void;
	tenantName?: string | undefined | null;
}

export function LoginPage({ onSubmit, isMultiTenant, autoFocus, onTenantChanged, tenantName }: LoginPageProps) {
	const { t } = useTranslation('AbpAccount');

	const loginSchema = Yup.object().shape({
		username: Yup.string().required(t('The {0} field is required.').replace('{0}', t('DisplayName:Username'))),
		password: Yup.string().required(t('The {0} field is required.').replace('{0}', t('DisplayName:Password'))),
	});

	return (
		<>
			<TenancyBox visible={isMultiTenant} tenantName={tenantName} onTenantChanged={onTenantChanged} />
			<Formik
				initialValues={{
					username: '',
					password: '',
					remember: false,
				}}
				validationSchema={loginSchema}
				onSubmit={onSubmit}
			>
				{props => <LoginForm autoFocus={autoFocus} {...props} />}
			</Formik>
		</>
	);
}

LoginPage.defaultProps = {
	autoFocus: false,
};

export default LoginPage;
