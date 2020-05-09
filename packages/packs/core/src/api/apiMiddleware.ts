/* eslint-disable @typescript-eslint/camelcase */
import { Middleware, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiSlice, apiRequest } from './apiSlice';
import { selectApiUrl, buildSelectCurrentTenant, buildSelectCurrentCulture } from '../application-configuration';
import { selectToken } from '../token';

const { apiStart, apiCompleted } = apiSlice.actions;

export function createApiMiddleware() {
	const loggerMiddleware: Middleware = ({ getState }: MiddlewareAPI) => (next: Dispatch) => async action => {
		next(action);

		if (action.type !== apiRequest.type) {
			return;
		}

		const state = getState();
		next(apiStart());

		const {
			url,
			method,
			data,
			onSuccess,
			onFailure,
			headers = {},
			successType,
			failureType,
			secured,
		} = action.payload;

		const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
		const BASE_URL = selectApiUrl(state);

		if (secured) {
			const { access_token, token_type } = selectToken(state);

			if (access_token && token_type) {
				headers.Authorization = `${token_type} ${access_token}`;
			}
		}

		const tenant = buildSelectCurrentTenant()(state);

		if (tenant.isAvailable) {
			// eslint-disable-next-line no-underscore-dangle
			headers.__tenant = tenant.id;
		}

		if (!Reflect.has(headers, 'Accept-Language')) {
			const result = buildSelectCurrentCulture()(state);

			const cultureName = result?.cultureName;

			if (cultureName) headers['Accept-Language'] = cultureName;
		}

		try {
			const response = await axios.request({
				url: `${BASE_URL}${url}`,
				method,
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
				[dataOrParams]: data,
			});
			if (successType) {
				next(
					successType({
						data: response.data,
						response,
					}),
				);
			}
			if (onSuccess) {
				onSuccess(response.data);
			}
		} catch (error) {
			if (failureType) {
				next(failureType(error));
			}

			if (onFailure) {
				onFailure(error);
			}
		} finally {
			next(apiCompleted());
		}
	};

	return loggerMiddleware;
}

export default createApiMiddleware;
