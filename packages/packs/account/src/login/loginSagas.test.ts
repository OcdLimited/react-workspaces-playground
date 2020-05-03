import { act } from 'react-dom/test-utils';
import { all, takeEvery, putResolve } from 'redux-saga/effects';
import rootSaga, { performLogin, watchLogin, watchSwitchTenant, performSwitchTenant } from './loginSagas';
import { login, switchTenant, requestChangeTenant } from './loginSlice';
import { requestAppConfig, clearTenant } from '@ocdlimited/abp.react.core';

describe('performLogin', () => {
	it('success works', () => {
		const navigate = jest.fn();
		const gen = performLogin({
			type: '',
			payload: {
				username: 'string;',
				password: 'string;',
				rememberMe: true,
				form: {},
				navigate,
			},
		});

		act(() => {
			gen.next(); // setup
			gen.next({}); // get settings
			gen.next(); // discovery
			gen.next(); // tenant
			gen.next({ success: true }); // result
			gen.next(); // set token
			gen.next(); // set config
		});

		expect(navigate).toBeCalledWith('/home');
	});

	it('not success works', () => {
		const navigate = jest.fn();
		const form = {
			setSubmitting: jest.fn(),
		};

		const gen = performLogin({
			type: '',
			payload: {
				username: 'string;',
				password: 'string;',
				rememberMe: true,
				form,
				navigate,
			},
		});

		act(() => {
			gen.next(); // setup
			gen.next({}); // get settings
			gen.next({}); // discovery
			gen.next({}); // tenanr
			gen.next({ success: false }); // result
			gen.next({}); // alert
		});

		expect(navigate).not.toBeCalledWith('/');
		expect(form.setSubmitting).toBeCalledWith(false);
	});
});

describe('watchLogin', () => {
	it('should watch', () => {
		const gen = watchLogin();

		expect(gen.next().value).toEqual(takeEvery(login, performLogin));
	});
});

describe('rootSaga', () => {
	it('should start', () => {
		const gen = rootSaga();

		expect(gen.next().value).toEqual(all([watchLogin(), watchSwitchTenant()]));
	});
});

describe('watchSwitchTenant', () => {
	it('should watch', () => {
		const gen = watchSwitchTenant();

		expect(gen.next().value).toEqual(takeEvery(switchTenant, performSwitchTenant));
	});
});

describe('performSwitchTenant', () => {
	it('change success works', () => {
		const gen = performSwitchTenant({
			type: '',
			payload: 'name',
		});

		var requestChange, updateConfig;

		act(() => {
			requestChange = gen.next().value;
			updateConfig = gen.next().value;
		});

		expect(requestChange).toEqual(putResolve(requestChangeTenant('name')));
		expect(updateConfig).toEqual(putResolve(requestAppConfig(false)));
	});

	it('change success works', () => {
		const gen = performSwitchTenant({
			type: '',
			payload: '',
		});

		var requestChange, updateConfig;

		act(() => {
			requestChange = gen.next().value;
			updateConfig = gen.next().value;
		});

		expect(requestChange).toEqual(putResolve(clearTenant()));
		expect(updateConfig).toEqual(putResolve(requestAppConfig(false)));
	});
});
