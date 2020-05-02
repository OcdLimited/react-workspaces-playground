import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TenancyBox, LoginForm } from '../components';

interface LoginPageProps {
	onSubmit: any;
	isMultiTenant: boolean;
	isSelfRegistrationEnabled: boolean;
	autoFocus: boolean;
	onTenantChanged?: any;
	tenantName?: string | undefined | null;
}

export function LoginPage({ onSubmit, isMultiTenant, autoFocus, onTenantChanged, tenantName }: LoginPageProps) {
	const { t } = useTranslation('AbpAccount');

	const loginSchema = Yup.object().shape({
		username: Yup.string().required(t('The {0} field is required.').replace('{0}', t('DisplayName:Username'))),
		password: Yup.string().required(t('The {0} field is required.').replace('{0}', t('DisplayName:Password'))),
	});

	return (
		<React.Fragment>
			<TenancyBox visible={isMultiTenant} tenantName={tenantName} onTenantChanged={onTenantChanged} />
			<Formik
				initialValues={{
					username: '',
					password: '',
				}}
				validationSchema={loginSchema}
				onSubmit={onSubmit}
			>
				{props => <LoginForm autoFocus={autoFocus} {...props} />}
			</Formik>
		</React.Fragment>
	);
}

LoginPage.defaultProps = {
	autoFocus: false,
};

export default LoginPage;
