/* eslint-disable */
import { AppConfigResponse } from './application-configuration';
import * as ABP from './common';

export type ConfigState = AppConfigResponse &
	ABP.Root & { environment: Environment } & {
		routes: ABP.FullRoute[];
		flattedRoutes: ABP.FullRoute[];
	};

export interface Environment {
	application: Application;
	production: boolean;
	hmr?: boolean;
	oAuthConfig: any; // todo: any update
	apis: Apis;
	localization: { defaultResourceName: string };
}

export interface Application {
	name: string;
	logoUrl?: string;
}

export interface ApiConfig {
	[key: string]: string;
	url: string;
}

export interface Apis {
	[key: string]: ApiConfig;
	default: ApiConfig;
}

export interface Requirements {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	layouts: any[];
}

export interface LocalizationWithDefault {
	key: string;
	defaultValue: string;
}

export type LocalizationParam = string | LocalizationWithDefault;
