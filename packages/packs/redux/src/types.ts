import { Saga, Task } from 'redux-saga';
import { Store, AnyAction, Reducer } from '@reduxjs/toolkit';

export interface AbpSagaTask extends Task {
	end: () => {};
}

export interface SagaDescriptor {
	key: string;
	mode?: string;
	saga: Saga;
	task?: AbpSagaTask;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InjectableStore extends Store<any, AnyAction> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createRootReducer(injectedReducers: any): Reducer<any, AnyAction>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	injectedReducers: any;
	injectedSagas: {
		[key: string]: SagaDescriptor | undefined;
	};
	runSaga<S extends Saga>(saga: S, ...args: Parameters<S>): AbpSagaTask;
}
