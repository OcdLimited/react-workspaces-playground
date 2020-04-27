import { configureStore, ThunkAction, Action, StoreEnhancer } from '@reduxjs/toolkit';
import withReduxEnhancer from 'addon-redux/enhancer';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas/sagas';

const enhancers = new Array<StoreEnhancer>();

if (process.env.NODE_ENV !== 'production') {
	enhancers.push(withReduxEnhancer);
}

const sagaMiddleware = createSagaMiddleware();

export const store = {
	...configureStore({
		reducer: rootReducer,
		enhancers: enhancers,
		middleware: [sagaMiddleware],
	}),
	injectedSagas: [],
	runSaga: sagaMiddleware.run,
};

sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer);
	});
}

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
