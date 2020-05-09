import { combineReducers } from '@reduxjs/toolkit';
import { InjectableStore, buildStore as innerBuildStore } from '@ocdlimited/abp.react.redux';
import { apiReducer, createApiMiddleware } from '../api';
import { appConfigReducer, appConfigSaga } from '../application-configuration';
import { toastReducer } from '../toast';
import { tokenReducer } from '../token';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createRootReducer(injectedReducers: any): any {
	return combineReducers({
		api: apiReducer,
		config: appConfigReducer,
		toast: toastReducer,
		token: tokenReducer,
		...injectedReducers,
	});
}

export function buildStore(rootReducer: unknown, preloadedState?: unknown): InjectableStore {
	const reducer = createRootReducer(rootReducer);
	return innerBuildStore(reducer, createRootReducer, preloadedState, [createApiMiddleware()], [appConfigSaga]);
}

export default buildStore;
