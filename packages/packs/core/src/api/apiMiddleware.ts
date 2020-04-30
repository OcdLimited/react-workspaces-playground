import { Middleware, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import { apiSlice, apiRequest } from './apiSlice';
import { selectApiUrl } from '../application-configuration';
import axios from 'axios';

const { apiStart, apiCompleted } = apiSlice.actions;

export function createApiMiddleware() {
	const loggerMiddleware: Middleware = ({ getState }: MiddlewareAPI) => (next: Dispatch) => async action => {
		next(action);

		if (action.type !== apiRequest.type) {
			return;
		}

		const state = getState();
		next(apiStart());

		const { url, method, data, onSuccess, onFailure, headers } = action.payload;
		const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
		const BASE_URL = selectApiUrl(state);

		console.log(BASE_URL, state);
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
			onSuccess && onSuccess(response.data);
		} catch (error) {
			onFailure && onFailure(error);
		} finally {
			next(apiCompleted());
		}
	};

	return loggerMiddleware;
}

export default createApiMiddleware;
