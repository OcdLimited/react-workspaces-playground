import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About } from './features/about/About';

export default () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<About />} />
			<Route path="/about" element={<About />} />
		</Routes>
	</BrowserRouter>
);
