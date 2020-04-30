import { combineReducers } from '@reduxjs/toolkit';
import { apiReducer, appConfigReducer } from '@ocdlimited/abp.react.core';

export function createRootReducer(injectedReducers: any): any {
	return combineReducers({
		api: apiReducer,
		config: appConfigReducer,
		...injectedReducers,
	});
}
