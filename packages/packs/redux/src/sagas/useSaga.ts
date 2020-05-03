/* istanbul ignore file */
import { useStore } from 'react-redux';
import { useMountEffect } from '@ocdlimited/abp.react.core';
import { SagaDescriptor, useSagaInjector } from './sagaInjector';
import { InjectableStore } from '../store';

export function useSaga(reg: SagaDescriptor, props?: any) {
	const store = useStore();
	const injectSaga = useSagaInjector(store as InjectableStore);

	useMountEffect(() => {
		injectSaga.inject(reg.key, reg, props);

		return function cleanup() {
			injectSaga.eject(reg.key);
		};
	});
}
