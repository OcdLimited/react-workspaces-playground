import { InjectableStore } from '../store';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const Mode = {
	RESTART_ON_REMOUNT,
	DAEMON,
	ONCE_TILL_UNMOUNT,
};

export interface SagaDescriptor {
	key: string;
	mode?: string;
	saga: any;
}

export function injectSagaFactory(store: InjectableStore) {
	return function injectSaga(key: string, descriptor: SagaDescriptor, args?: any) {
		const newDescriptor = {
			...descriptor,
			mode: descriptor.mode || RESTART_ON_REMOUNT,
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

		if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== Mode.ONCE_TILL_UNMOUNT)) {
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
			if (descriptor.mode !== Mode.DAEMON && descriptor.task) {
				/* istanbul ignore next */
				if (descriptor.task.isRunning()) {
					descriptor.task.end();
					descriptor.task.cancel();
				}
				// Clean up in production; in development we need `descriptor.saga` for hot reloading
				/* istanbul ignore next */
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
