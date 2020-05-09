import { createAction, createSelector } from '@reduxjs/toolkit';
import { FormikHelpers } from 'formik';
import {
	apiRequest,
	receiveTenantChange,
	selectSettings,
	buildMelectMultiTenancyIsEnabled,
	buildSelectCurrentTenant,
	buildSelectLanguages,
	buildSelectCurrentCulture,
} from '@ocdlimited/abp.react.core';
import { buildSelectCurrentTheme, buildSelectAvailableThemes } from '@ocdlimited/abp.react.theme.shared';
import { NavigateFunction } from 'react-router';

export type LoginData = {
	username: string;
	password: string;
	rememberMe?: boolean;
};

export interface LoginPayload extends LoginData {
	form: FormikHelpers<LoginData>;
	navigate: NavigateFunction;
}

export const login = createAction<LoginPayload>('account/login');

export const switchTenant = createAction<string>('account/login/switchTenant');
export const requestChangeTenant = (
	name: string,
	onSuccess?: (data: string) => void,
	onFailure?: (error: Error) => void,
) =>
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
			buildSelectAvailableThemes(),
			buildSelectCurrentTheme(),
		],
		(
			languages,
			currentCulture,
			[isSelfRegistrationEnabled, enableLocalLogin],
			tenant,
			multiTenancy,
			availableThemes,
			currentTheme,
		) => ({
			languages,
			currentCulture,
			isSelfRegistrationEnabled: isSelfRegistrationEnabled?.toLowerCase() === 'true',
			enableLocalLogin: enableLocalLogin?.toLowerCase() === 'true',
			tenant,
			multiTenancy: !!multiTenancy,
			availableThemes,
			currentTheme,
		}),
	);
