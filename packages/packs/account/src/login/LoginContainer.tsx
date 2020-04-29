import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useSaga, Mode } from '@ocdlimited/abp.react.redux';
import { useNavigate } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { login, LoginData } from './loginSlice';
import rootSaga from './sagas';

export function buildOnSubmit(dispatch: Dispatch<any>, navigate: any) {
	return (data: LoginData, form: any) => {
		const payload = {
			...data,
			form,
			navigate,
		};
		dispatch(login(payload));
	};
}

export function LoginContainer() {
	useSaga({
		key: 'login',
		saga: rootSaga,
		mode: Mode.ONCE_TILL_UNMOUNT,
	});
	const navigate = useNavigate();

	const dispatch = useDispatch();

	return <LoginPage onSubmit={buildOnSubmit(dispatch, navigate)} />;
}

export default LoginContainer;
