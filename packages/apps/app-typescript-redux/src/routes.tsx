import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './features/home/Home';
import { LoginPage } from './features/login';

export default () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	</BrowserRouter>
);
