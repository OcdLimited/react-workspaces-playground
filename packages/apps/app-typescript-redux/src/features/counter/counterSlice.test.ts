import reducer, { increment, decrement, incrementByAmount } from './counterSlice';

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ value: 0 });
});

it('increment', () => {
	expect(reducer(undefined, increment)).toEqual({ value: 1 });
});

it('decrement', () => {
	expect(reducer(undefined, decrement)).toEqual({ value: -1 });
});

it('incrementByAmount', () => {
	expect(reducer(undefined, incrementByAmount(100))).toEqual({ value: 100 });
});
