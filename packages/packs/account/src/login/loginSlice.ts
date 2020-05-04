import { createAction, createSelector } from '@reduxjs/toolkit';
import { FormikProps } from 'formik';
import {
	apiRequest,
	receiveTenantChange,
	selectSettings,
	buildMelectMultiTenancyIsEnabled,
	buildSelectCurrentTenant,
	buildSelectLanguages,
	buildSelectCurrentCulture,
} from '@ocdlimited/abp.react.core';

export interface LoginData {
	username: string;
	password: string;
	rememberMe?: boolean;
	form: FormikProps<any>;
	navigate: any;
}

export const login = createAction<LoginData>('account/login');

export const switchTenant = createAction<string>('account/login/switchTenant');
export const requestChangeTenant = (name: string, onSuccess?: any, onFailure?: any) =>
	apiRequest({
		url: `/api/abp/multi-tenancy/tenants/by-name/${name}`,
		method: 'GET',
		onSuccess,
		onFailure,
		successType: receiveTenantChange,
	});

export const buildSelectLoginSettings = () =>
	createSelector(
		[
			buildSelectLanguages(),
			buildSelectCurrentCulture(),
			selectSettings('Abp.Account.IsSelfRegistrationEnabled', 'Abp.Account.EnableLocalLogin'),
			buildSelectCurrentTenant(),
			buildMelectMultiTenancyIsEnabled(),
		],
		(languages, currentCulture, [isSelfRegistrationEnabled, enableLocalLogin], tenant, multiTenancy) => ({
			languages,
			currentCulture,
			isSelfRegistrationEnabled: isSelfRegistrationEnabled?.toLowerCase() === 'true',
			enableLocalLogin,
			tenant,
			multiTenancy: !!multiTenancy,
		}),
	);
