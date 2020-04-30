import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfigResponse, Localization, Auth, Value, CurrentUser, Environment } from '../models';

interface AppConfigState {
	environment?: Environment;
	localization?: Localization;
	auth?: Auth;
	setting?: Value;
	currentUser?: CurrentUser;
	features?: Value;
	loaded: boolean;
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
	},
});

export const { setConfig } = appConfigSlice.actions;

export type RootState = {
	config: AppConfigState;
};

export const selectConfigLoaded = (state: RootState) => state.config.loaded;
export const selectApiUrl = (state: RootState) => state.config.environment && state.config.environment.apis.default.url;
export const selectLocalization = (state: RootState): any | undefined => state.config.localization;

export default appConfigSlice.reducer;
