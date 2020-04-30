import React from 'react';
import loadable from '@loadable/component';

const fallback = <div>loading....</div>;

export const LoginContainer = loadable(() => import('./LoginContainer'), { fallback });
