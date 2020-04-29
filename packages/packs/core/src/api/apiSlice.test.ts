import reducer, { apiStart, apiCompleted } from './apiSlice';

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ inflight: 0 });
});

it('apiStart', () => {
	expect(reducer(undefined, apiStart)).toEqual({ inflight: 1 });
});

it('apiCompleted', () => {
	expect(reducer(undefined, apiCompleted)).toEqual({ inflight: -1 });
});
