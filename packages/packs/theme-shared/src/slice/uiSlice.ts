import { createSlice, createSelector } from '@reduxjs/toolkit';

export interface Theme {
	themeName: string;
}

interface UiState {
	currentTheme: string;
	availableThemes: string[];
}

export const emptyTheme = {
	themeName: 'empty',
};

const initialState: UiState = {
	currentTheme: emptyTheme.themeName,
	availableThemes: [],
};

const name = 'ui';

const setUiHelper = (state: UiState, action: { payload: any }) => {
	return {
		...state,
		...action.payload,
	};
};

export const uiSlice = createSlice({
	name,
	initialState,
	reducers: {
		setUi: setUiHelper,
		setCurrentTheme: (state, action) => {
			state.currentTheme = action.payload;
		},
	},
});

export const { setUi, setCurrentTheme } = uiSlice.actions;

export type RootState = {
	ui: UiState;
};

export const buildSelectCurrentTheme = () =>
	createSelector(
		(state: RootState) => state.ui,
		u => u?.currentTheme,
	);

export default uiSlice.reducer;
