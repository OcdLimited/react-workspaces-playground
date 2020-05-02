import { createSlice } from '@reduxjs/toolkit';

interface {{properCase name}}State {
	loading: 'none' | 'loaded' | 'loading';
}

const initialState: {{properCase name}}State = {
	loading: 'none',
};

const name = '{{camelCase name}}';

const set{{properCase name}}Helper = (state: {{properCase name}}State, action: { payload: any; }) => {
			return {
				...state,
				...action.payload,
				loading: 'loaded',
			};
		};

export const {{camelCase name}}Slice = createSlice({
	name,
	initialState,
	reducers: {
		set{{properCase name}}: set{{properCase name}}Helper,
		receive{{properCase name}}: (state, { payload: { data: payload}}) => {
			return set{{properCase name}}Helper(state, {payload})
		},
	},
});

export const { set{{properCase name}}, receive{{properCase name}} } = {{camelCase name}}Slice.actions;

export type RootState = {
	{{camelCase name}}: {{properCase name}}State;
};

export const select{{properCase name}}Loaded = (state: RootState) => state.{{camelCase name}}.loading === 'loaded';
export const select{{properCase name}}Loading = (state: RootState) => state.{{camelCase name}}.loading === 'loading';
export const select{{properCase name}}NeedsLoaded = (state: RootState) => state.{{camelCase name}}.loading === 'none';

export default {{camelCase name}}Slice.reducer;
