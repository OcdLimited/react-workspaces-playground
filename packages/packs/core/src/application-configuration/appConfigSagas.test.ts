import { act } from 'react-dom/test-utils';
import { all, takeEvery, put } from 'redux-saga/effects';
import rootSaga, { watchCurrentCultureChange, performCurrentCultureChange } from './appConfigSagas';
import { changeCurrentCulture, requestAppConfig } from './appConfigSlice';

describe('rootSaga', () => {
	it('should start', () => {
		const gen = rootSaga();

		expect(gen.next().value).toEqual(all([watchCurrentCultureChange()]));
	});
});

describe('watchCurrentCultureChange', () => {
	it('should watch', () => {
		const gen = watchCurrentCultureChange();

		expect(gen.next().value).toEqual(takeEvery(changeCurrentCulture.toString(), performCurrentCultureChange));
	});
});

describe('performCurrentCultureChange', () => {
	it('authenticated', () => {
		const gen = performCurrentCultureChange({
			payload: {
				cultureName: 'en',
			},
		});

		let result;

		act(() => {
			gen.next(); // select is authenticated
			result = gen.next().value; // put
		});
		expect(result).toEqual(
			put(
				requestAppConfig(undefined, undefined, undefined, {
					'Accept-Language': 'en',
				}),
			),
		);
	});
});
