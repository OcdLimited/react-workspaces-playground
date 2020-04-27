import { performIncrementAsync, watchIncrementAsync } from './sagas';
import { put, takeEvery, all } from 'redux-saga/effects';
import { incrementByAmount, incrementAsync } from './counterSlice';

describe('performIncrementAsync', () => {
	it('should work', () => {
		const gen = performIncrementAsync({
			payload: 1,
		});

		gen.next(); // delay
		expect(gen.next().value).toEqual(put(incrementByAmount(1)));
	});
});

describe('watchIncrementAsync', () => {
	it('should work', () => {
		const gen = watchIncrementAsync();

		expect(gen.next().value).toEqual(takeEvery(incrementAsync, performIncrementAsync));
	});
});
