import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfigResponse, Localization, Auth, Value, CurrentUser, Environment } from '../models';
import { apiRequest } from '../api/apiSlice';

interface AppConfigState {
	environment?: Environment;
	localization?: Localization;
	auth?: Auth;
	setting?: Value;
	currentUser?: CurrentUser;
	features?: Value;
	loaded: boolean;
	multiTenancy?: MultiTenancy;
}

interface MultiTenancy {
	isEnabled: boolean;
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
	},
});

export const { setConfig, receiveConfig } = appConfigSlice.actions;

export const requestAppConfig = (secured?: boolean, onSuccess?: any, onFailure?: any) =>
	apiRequest({
		url: '/api/abp/application-configuration',
		method: 'GET',
		onSuccess,
		onFailure,
		successType: receiveConfig,
		secured,
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

export default appConfigSlice.reducer;
