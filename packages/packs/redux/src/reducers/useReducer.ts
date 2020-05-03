/* istanbul ignore file */
import { useStore } from 'react-redux';
import { useMountEffect } from '@ocdlimited/abp.react.core';
import { ReducerDescriptor, useReducerInjector } from './reducerInjector';
import { InjectableStore } from '../store';

export function useReducer(reg: ReducerDescriptor) {
	const store = useStore();
	const { inject } = useReducerInjector(store as InjectableStore);

	useMountEffect(() => {
		inject(reg.key, reg.reducer);
	});
}
