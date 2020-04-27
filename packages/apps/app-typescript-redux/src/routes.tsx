import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './features/login';
import { About } from './features/about/About';

export default () => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/" element={<About />} />
			<Route path="/about" element={<About />} />
		</Routes>
	</BrowserRouter>
);
