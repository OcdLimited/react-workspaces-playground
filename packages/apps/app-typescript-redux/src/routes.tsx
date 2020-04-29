import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccountRoutes } from '@ocdlimited/abp.react.account';
import { About } from './features/about/About';

export default () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<About />} />
			<Route path="/about" element={<About />} />
			<Route path={AccountRoutes.path} element={<AccountRoutes />} />
		</Routes>
	</BrowserRouter>
);
