import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccountRoutes } from '@ocdlimited/abp.react.account';
import { About } from './features/about/About';
import { StandardWithMenuDrawer } from '@ocdlimited/abp.react.theme.shared';

export default () => (
	<BrowserRouter>
		<Routes>
			<StandardWithMenuDrawer secure>
				<Route path="/" element={<About />} />
				<Route path="/about" element={<About />} />
			</StandardWithMenuDrawer>
			<Route path={AccountRoutes.path} element={<AccountRoutes />} />
		</Routes>
	</BrowserRouter>
);
