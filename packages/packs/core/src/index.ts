import { useEffect } from 'react';

export * from './api';
export * from './application-configuration';
export * from './localization';
export * from './components';
export * from './toast';
export * from './token';
export * from './authentication/useAuthentication';

export const useMountEffect = (fun: any) => useEffect(fun, []);
