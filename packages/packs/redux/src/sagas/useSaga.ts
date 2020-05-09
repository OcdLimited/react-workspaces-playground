/* istanbul ignore file */
import { useEffect, EffectCallback } from 'react';
import { useStore } from 'react-redux';
import { useSagaInjector } from './sagaInjector';
import { InjectableStore, SagaDescriptor } from '../types';

const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

export function useSaga(reg: SagaDescriptor, props?: unknown) {
	const store = useStore();
	const injectSaga = useSagaInjector(store as InjectableStore);

	useMountEffect(() => {
		injectSaga.inject(reg.key, reg, props);

		return function cleanup() {
			injectSaga.eject(reg.key);
		};
	});
}
