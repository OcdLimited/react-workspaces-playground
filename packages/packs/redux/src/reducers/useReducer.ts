/* istanbul ignore file */
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { ReducerDescriptor, useReducerInjector } from './reducerInjector';
import { InjectableStore } from '../store';

export function useReducer(reg: ReducerDescriptor) {
	const store = useStore();
	const { inject } = useReducerInjector(store as InjectableStore);

	useEffect(() => {
		inject(reg.key, reg.reducer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
