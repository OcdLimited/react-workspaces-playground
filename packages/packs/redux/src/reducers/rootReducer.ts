import { combineReducers } from '@reduxjs/toolkit';
import { apiReducer, appConfigReducer, toastReducer, tokenReducer } from '@ocdlimited/abp.react.core';

export function createRootReducer(injectedReducers: any): any {
	return combineReducers({
		api: apiReducer,
		config: appConfigReducer,
		toast: toastReducer,
		token: tokenReducer,
		...injectedReducers,
	});
}
