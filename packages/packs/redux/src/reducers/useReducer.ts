/* istanbul ignore file */
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { ReducerDescriptor, useReducerInjector } from './reducerInjector';
import { InjectableStore } from '../store';

export function useReducer(reg: ReducerDescriptor) {
	const store = useStore();
	const injectReducer = useReducerInjector(store as InjectableStore);

	useEffect(() => {
		injectReducer.inject(reg.key, reg.reducer);
	});
}
