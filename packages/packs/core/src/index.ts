import { useEffect, EffectCallback } from 'react';

export * from './api';
export * from './application-configuration';
export * from './localization';
export * from './components';
export * from './toast';
export * from './token';
export * from './authentication/useAuthentication';
export * from './store';

/* istanbul ignore next */
export const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);
