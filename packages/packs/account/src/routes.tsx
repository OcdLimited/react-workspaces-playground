import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginContainer } from './login/loadable';

const routes = () => (
	<Routes>
		<Route path="/login" element={<LoginContainer />} />
		<Route path="/forgot-password" element={<LoginContainer />} />
	</Routes>
);
routes.path = 'account/*';

export default routes;
