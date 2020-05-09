import { configureStore, StoreEnhancer, Reducer } from '@reduxjs/toolkit';
import withReduxEnhancer from 'addon-redux/enhancer';
import createSagaMiddleware, { Saga } from 'redux-saga';
// import { createRootReducer } from './reducers/rootReducer';
import { InjectableStore, AbpSagaTask } from './types';

const enhancers: StoreEnhancer[] = [];

if (process.env.NODE_ENV !== 'production') {
	enhancers.push(withReduxEnhancer);
}

export function buildStore(
	rootReducer: Reducer,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createRootReducer: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	preloadedState?: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	middlewares: any[] = [],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sagas: any[] = [],
): InjectableStore {
	const sagaMiddleware = createSagaMiddleware();

	const { run } = sagaMiddleware;

	const store = {
		...configureStore({
			reducer: rootReducer,
			enhancers,
			middleware: [...middlewares, sagaMiddleware],
			preloadedState,
		}),
		injectedSagas: {},
		injectedReducers: {},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		runSaga: (saga: Saga, ...args: any[]) => run(saga, ...args) as AbpSagaTask,
		createRootReducer,
	};

	sagas.forEach(s => run(s));

	/* istanbul ignore next */
	if (process.env.NODE_ENV === 'development' && module.hot) {
		if (module.hot) {
			// Enable Webpack hot module replacement for reducers
			module.hot.accept('./reducers', () => {
				const nextReducer = createRootReducer(store.injectedReducers);
				store.replaceReducer(nextReducer);
			});
		}
	}

	return store;
}
