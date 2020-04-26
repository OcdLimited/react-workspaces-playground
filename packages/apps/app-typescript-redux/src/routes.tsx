import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './features/home/Home';

export default () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	</BrowserRouter>
);
