import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { AppConfigResponse, Localization, Auth, Value, CurrentUser, Environment } from '../models';
import { apiRequest } from '../api/apiSlice';

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

export const changeCurrentCulture = createAction<any>('appConfig/changeCurrentCulture');

export const clearTenant = () => ({
	type: 'appConfig/clearTenant',
});

export const requestAppConfig = (secured?: boolean, onSuccess?: any, onFailure?: any, headers?: any) =>
	apiRequest({
		url: '/api/abp/application-configuration',
		method: 'GET',
		onSuccess,
		onFailure,
		successType: receiveConfig,
		secured,
		headers,
	});

export type RootState = {
	config: AppConfigState;
};

export const selectConfigLoaded = (state: RootState) => state.config.loaded;
export const selectApiUrl = (state: RootState) => state.config.environment?.apis.default.url;
export const selectLocalization = (state: RootState): Localization | undefined => state.config.localization;
export const selectAuthSettings = (state: RootState): any | undefined => state.config.environment?.oAuthConfig;
export const selectIsAuthenticated = (state: RootState) => state.config.currentUser?.isAuthenticated;
export const selectAppName = (state: RootState) => state.config?.environment?.application?.name;
export const selectSettings = (...paths: string[]) => (state: RootState) => {
	const values = state.config.setting?.values || {};

	return paths.map(s => values[s]);
};
export const selectMultiTenancy = (state: RootState) => state.config.multiTenancy?.isEnabled;
export const selectCurrentTenant = (state: RootState): CurrentTenant =>
	state.config.currentTenant || {
		isAvailable: false,
	};
export const selectCurrentCulture = (state: RootState) => state.config.localization?.currentCulture || {};
export const selectLanguages = (state: RootState) => state.config.localization?.languages || [];

export default appConfigSlice.reducer;
