import { createSlice } from '@reduxjs/toolkit';

interface TokenSessionState {
	current: any;
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
