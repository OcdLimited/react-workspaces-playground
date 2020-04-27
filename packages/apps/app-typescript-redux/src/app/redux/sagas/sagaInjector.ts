import { Store } from '@reduxjs/toolkit';

export enum Mode {
	RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount',
	DAEMON = '@@saga-injector/daemon',
	ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount',
}

export interface SagaDescriptor {
	key: string;
	mode?: Mode;
	saga: any;
}

export interface InjectableStore extends Store {
	injectedSagas: any;
	runSaga(saga: any, args: any): any;
}

export function injectSagaFactory(store: InjectableStore) {
	return function injectSaga(key: string, descriptor: SagaDescriptor, args: any) {
		if (!descriptor) return;

		const newDescriptor = {
			...descriptor,
			mode: descriptor.mode || Mode.RESTART_ON_REMOUNT,
		};
		const { saga, mode } = newDescriptor;

		let hasSaga = Reflect.has(store.injectedSagas, key);

		if (process.env.NODE_ENV !== 'production') {
			const oldDescriptor = store.injectedSagas[key];
			// enable hot reloading of daemon and once-till-unmount sagas
			if (hasSaga && oldDescriptor.saga !== saga) {
				oldDescriptor.task.cancel();
				hasSaga = false;
			}
		}

		if (!hasSaga || (hasSaga && mode !== Mode.DAEMON && mode !== Mode.ONCE_TILL_UNMOUNT)) {
			/* eslint-disable no-param-reassign */
			store.injectedSagas[key] = {
				...newDescriptor,
				task: store.runSaga(saga, args),
			};
			/* eslint-enable no-param-reassign */
		}
	};
}

export function ejectSagaFactory(store: InjectableStore) {
	return function ejectSaga(key: string) {
		if (Reflect.has(store.injectedSagas, key)) {
			const descriptor = store.injectedSagas[key];
			if (descriptor.mode !== Mode.DAEMON) {
				descriptor.task.cancel();
				// Clean up in production; in development we need `descriptor.saga` for hot reloading
				if (process.env.NODE_ENV === 'production') {
					// Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
					store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
				}
			}
		}
	};
}

export function useSagaInjector(store: InjectableStore) {
	return {
		inject: injectSagaFactory(store),
		eject: ejectSagaFactory(store),
	};
}

export default useSagaInjector;
