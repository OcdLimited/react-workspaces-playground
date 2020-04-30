import React from 'react';
import loadable from '@loadable/component';
import { Loading } from '@ocdlimited/abp.react.core';

const fallback = (
	<div>
		<Loading color="secondary" className="loading-content" />
	</div>
);

export const LoginContainer = loadable(() => import('./LoginContainer'), { fallback });
