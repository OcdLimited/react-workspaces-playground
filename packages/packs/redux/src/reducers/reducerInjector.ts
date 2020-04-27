import { createRootReducer } from './rootReducer';
import { InjectableStore } from '../store';

export interface ReducerDescriptor {
	key: string;
	reducer: any;
}

export function injectReducerFactory(store: InjectableStore) {
	return function injectReducer(key: string, reducer: any) {
		// Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
		if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) {
			return;
		}
		store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
		store.replaceReducer(createRootReducer(store.injectedReducers));
	};
}

export function useReducerInjector(store: InjectableStore) {
	return {
		inject: injectReducerFactory(store),
	};
}

export default useReducerInjector;
