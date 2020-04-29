import { createAction } from '@reduxjs/toolkit';
import { FormikProps } from 'formik';

export interface LoginData {
	username: string;
	password: string;
	rememberMe?: boolean;
	form: FormikProps<any>;
	navigate: any;
}

export const login = createAction<LoginData>('account/login');
