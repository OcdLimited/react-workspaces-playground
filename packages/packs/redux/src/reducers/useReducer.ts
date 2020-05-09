/* istanbul ignore file */
import { EffectCallback, useEffect } from 'react';
import { useStore } from 'react-redux';
import { ReducerDescriptor, useReducerInjector } from './reducerInjector';
import { InjectableStore } from '../types';

const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

export function useReducer(reg: ReducerDescriptor) {
	const store = useStore();
	const { inject } = useReducerInjector(store as InjectableStore);

	useMountEffect(() => {
		inject(reg.key, reg.reducer);
	});
}
