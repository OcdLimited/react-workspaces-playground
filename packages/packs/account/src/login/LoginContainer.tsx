import React from 'react';

import { LoginPage } from './pages/LoginPage';

export function LoginContainer() {
	return <LoginPage onSubmit={console.log} />;
}

export default LoginContainer;
