/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type TokenType = {
	access_token?: string;
	token_type?: string;
};

interface TokenSessionState {
	current: TokenType;
}

const initialState: TokenSessionState = {
	current: {},
};

export const tokenSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		recieveToken: (state, action) => {
			state.current = action.payload.data;
		},
	},
});

export const { recieveToken } = tokenSlice.actions;

export default tokenSlice.reducer;

interface RootState {
	token: TokenSessionState;
}

export const selectToken = (state: RootState) => state.token.current;
