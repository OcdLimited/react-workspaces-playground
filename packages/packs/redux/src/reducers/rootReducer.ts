import { combineReducers } from '@reduxjs/toolkit';

export function createRootReducer(injectedReducers: any): any {
	return combineReducers({
		...injectedReducers,
	});
}

const rootReducer = createRootReducer({});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
