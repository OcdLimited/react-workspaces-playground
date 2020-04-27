/* istanbul ignore file */
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { SagaDescriptor, useSagaInjector } from './sagaInjector';
import { InjectableStore } from '../store';

export function useSaga(reg: SagaDescriptor, props?: any) {
	const store = useStore();
	const injectSaga = useSagaInjector(store as InjectableStore);

	useEffect(() => {
		injectSaga.inject(reg.key, reg, props);

		return function cleanup() {
			injectSaga.eject(reg.key);
		};
	});
}
