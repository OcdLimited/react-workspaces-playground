import { createReducer } from '@reduxjs/toolkit';
import { buildStore } from '@ocdlimited/abp.react.redux';

export const store = buildStore({
	config: createReducer({}, {}),
});

export default store;
