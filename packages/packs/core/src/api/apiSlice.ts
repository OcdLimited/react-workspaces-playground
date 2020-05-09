/* eslint-disable no-param-reassign */
import { createSlice, createAction, Action, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Method } from 'axios';

interface ApiState {
	inflight: number;
}

const initialState: ApiState = {
	inflight: 0,
};

export const apiSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		apiStart: state => {
			state.inflight += 1;
		},
		apiCompleted: state => {
			state.inflight -= 1;
		},
	},
});

export const { apiStart, apiCompleted } = apiSlice.actions;

export interface ApiAction<T> extends Action {
	payload: HttpRequestDetails<T>;
}

export function apiRequest<T>(payload: HttpRequestDetails<T>): ApiAction<T> {
	return createAction<HttpRequestDetails<T>>('api/apiRequest')(payload);
}
apiRequest.type = 'api/apiRequest';

export type ApiRequestHeaders = {
	[key: string]: unknown;
};

type SuccessPayload<T> = {};

export interface HttpRequestDetails<T> {
	url: string;
	method: Method;
	data?: unknown;
	onSuccess?: (data: T) => void;
	onFailure?: (error: Error) => void;
	label?: string;
	secured?: boolean;
	successType?: ActionCreatorWithPayload<SuccessPayload<T>>;
	failureType?: ActionCreatorWithPayload<Error>;
	headers?: ApiRequestHeaders;
}

export default apiSlice.reducer;
