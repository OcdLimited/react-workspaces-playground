import { AnyAction, createSlice, createAction } from '@reduxjs/toolkit';
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

export interface ApiAction extends AnyAction {
	payload: HttpRequestDetails;
}

export const apiRequest = createAction<HttpRequestDetails>('api/apiRequest');

export interface HttpRequestDetails {
	url: string;
	method: Method;
	data?: any;
	onSuccess: any;
	onFailure?: any;
	label?: string;
	secured?: boolean;
	successType?: any;
	failureType?: any;
}

export default apiSlice.reducer;
