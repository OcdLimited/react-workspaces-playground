/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAction, createSelector } from '@reduxjs/toolkit';
import { AppConfigResponse, Localization, Auth, Value, CurrentUser, Environment } from '../models';
import { apiRequest, ApiRequestHeaders } from '../api/apiSlice';

interface AppConfigState {
	environment?: Environment;
	localization?: Localization;
	auth?: Auth;
	setting?: Value;
	currentUser?: CurrentUser;
	currentTenant?: CurrentTenant;
	features?: Value;
	loaded: boolean;
	multiTenancy?: MultiTenancy;
}

interface MultiTenancy {
	isEnabled: boolean;
}

interface CurrentTenant {
	id?: string | null;
	name?: string | undefined | null;
	isAvailable: boolean;
}

const initialState: AppConfigState = {
	loaded: false,
};

export const appConfigSlice = createSlice({
	name: 'appConfig',
	initialState,
	reducers: {
		setConfig: (state, action: PayloadAction<AppConfigResponse>) => {
			return {
				...state,
				...action.payload,
				loaded: true,
			};
		},
		receiveConfig: (state, action) => {
			return {
				...state,
				...action.payload.data,
				loaded: true,
			};
		},
		receiveTenantChange: (state, { payload }) => {
			const {
				data: { tenantId: id, name, success: isAvailable },
			} = payload;

			state.currentTenant = {
				id,
				name,
				isAvailable,
			};
		},
		clearTenant: state => {
			state.currentTenant = {
				isAvailable: false,
			};
		},
	},
});

export const { setConfig, receiveConfig, receiveTenantChange } = appConfigSlice.actions;

export const changeCurrentCulture = createAction<string>('appConfig/changeCurrentCulture');

export const clearTenant = () => ({
	type: 'appConfig/clearTenant',
});

export function requestAppConfig<T>(
	secured?: boolean,
	onSuccess?: (data: T) => void,
	onFailure?: (error: Error) => void,
	headers?: ApiRequestHeaders,
) {
	return apiRequest({
		url: '/api/abp/application-configuration',
		method: 'GET',
		onSuccess,
		onFailure,
		successType: receiveConfig,
		secured,
		headers,
	});
}

export type RootState = {
	config: AppConfigState;
};

export const selectConfig = (state: RootState) => state.config || {};

export const buildSelectConfigLoaded = () => createSelector(selectConfig, c => c.loaded);
export const buildSelectLocalization = () => createSelector(selectConfig, c => c.localization);
export const buildSelectIsAuthenticated = () => createSelector(selectConfig, c => c.currentUser?.isAuthenticated);
export const selectSettings = (...paths: string[]) =>
	createSelector([selectConfig], c => {
		const values = c.setting?.values || {};

		return paths.map(s => values[s]);
	});
export const buildMelectMultiTenancyIsEnabled = () => createSelector(selectConfig, c => c.multiTenancy?.isEnabled);

export const buildSelectCurrentTenant = () =>
	createSelector(
		selectConfig,
		c =>
			c.currentTenant || {
				isAvailable: false,
			},
	);

export const buildSelectCurrentCulture = () => createSelector(buildSelectLocalization(), l => l?.currentCulture);
export const buildSelectLanguages = () => createSelector(buildSelectLocalization(), l => l?.languages || []);

// Shared selectors as enviroment never changes during runtime
export const selectEnviroment = (state: RootState) => state.config.environment;
export const selectAuthSettings = createSelector(selectEnviroment, e => e?.oAuthConfig);
export const selectApiUrl = createSelector(selectEnviroment, e => e?.apis.default.url);
export const selectAppName = createSelector(selectEnviroment, e => e?.application?.name || 'Untitled');

export default appConfigSlice.reducer;
