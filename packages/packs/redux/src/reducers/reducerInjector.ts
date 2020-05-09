import { Reducer } from '@reduxjs/toolkit';
import { InjectableStore } from '../types';

export interface ReducerDescriptor {
	key: string;
	reducer: Reducer;
}

export function injectReducerFactory(store: InjectableStore) {
	return function injectReducer(key: string, reducer: Reducer) {
		// Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
		if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) {
			return;
		}
		store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
		store.replaceReducer(store.createRootReducer(store.injectedReducers));
	};
}

export function useReducerInjector(store: InjectableStore) {
	return {
		inject: injectReducerFactory(store),
	};
}

export default useReducerInjector;
