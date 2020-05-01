import { act } from 'react-dom/test-utils';
import { all, takeEvery } from 'redux-saga/effects';
import rootSaga, { performLogin, watchLogin } from './loginSagas';
import { login } from './loginSlice';

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
			gen.next({ success: true }); // result
			gen.next(); // set token
			gen.next(); // set config
		});

		expect(navigate).toBeCalledWith('/');
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

		expect(gen.next().value).toEqual(all([watchLogin()]));
	});
});
