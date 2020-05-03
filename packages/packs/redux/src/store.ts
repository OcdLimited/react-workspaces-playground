import { configureStore, StoreEnhancer, Store, AnyAction } from '@reduxjs/toolkit';
import withReduxEnhancer from 'addon-redux/enhancer';
import createSagaMiddleware from 'redux-saga';
import { createApiMiddleware, appConfigSaga } from '@ocdlimited/abp.react.core';
import { createRootReducer } from './reducers/rootReducer';

export interface InjectableStore extends Store<any, AnyAction> {
	injectedReducers: any;
	injectedSagas: any;
	runSaga(saga: any, args: any): any;
}

const enhancers: StoreEnhancer[] = [];

if (process.env.NODE_ENV !== 'production') {
	enhancers.push(withReduxEnhancer);
}

export function buildStore(rootReducer: any, preloadedState?: any): InjectableStore {
	const sagaMiddleware = createSagaMiddleware();

	const store = {
		...configureStore({
			reducer: createRootReducer(rootReducer),
			enhancers: enhancers,
			middleware: [createApiMiddleware(), sagaMiddleware],
			preloadedState,
		}),
		injectedSagas: [],
		injectedReducers: { ...rootReducer },
		runSaga: sagaMiddleware.run,
	};

	sagaMiddleware.run(appConfigSaga);

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
