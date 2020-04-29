import { combineReducers } from '@reduxjs/toolkit';

export function createRootReducer(injectedReducers: any): any {
	return combineReducers({
		...injectedReducers,
	});
}
