import { eLayoutType } from '../enums/common';
import * as Config from './config';

export interface Root {
	environment: Partial<Config.Environment>;
	/**
	 *
	 * @deprecated To be deleted in v3.0
	 */
	requirements?: Config.Requirements;
	skipGetAppConfiguration?: boolean;
}

export interface Test {
	baseHref?: string;
}

export type PagedResponse<T> = {
	totalCount: number;
} & PagedItemsResponse<T>;

export interface PagedItemsResponse<T> {
	items: T[];
}

export interface PageQueryParams {
	filter?: string;
	sorting?: string;
	skipCount?: number;
	maxResultCount?: number;
}

export interface Route {
	children?: Route[];
	invisible?: boolean;
	layout?: eLayoutType;
	name: string;
	order?: number;
	parentName?: string;
	path: string;
	requiredPolicy?: string;
	iconClass?: string;
}

export interface FullRoute extends Route {
	url?: string;
	wrapper?: boolean;
}

export interface BasicItem {
	id: string;
	name: string;
}

export interface Option<T> {
	key: Extract<keyof T, string>;
	value: T[Extract<keyof T, string>];
}

export interface Dictionary<T = any> {
	[key: string]: T;
}

export type ExtractFromOutput = {};
