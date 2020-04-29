import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginContainer } from './login/LoginContainer';

const routes = () => (
	<React.Fragment>
		<Routes>
			<Route path="/login" element={<LoginContainer />} />
			<Route path="/forgot-password" element={<LoginContainer />} />
		</Routes>
	</React.Fragment>
);
routes.path = 'account/*';

export default routes;
