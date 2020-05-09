import reducer, { recieveToken, selectToken } from './tokenSlice';

const token = {
	access_token: '',
	expires_in: 31536000,
	token_type: 'Bearer',
	scope: 'AdsDataSpike',
};

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ current: {} });
});

it('recieveToken', () => {
	expect(
		reducer(
			undefined,
			recieveToken({
				data: token,
			}),
		),
	).toEqual({ current: token });
});

it('selectToken', () => {
	const state = {
		token: reducer(
			undefined,
			recieveToken({
				data: token,
			}),
		),
	};
	expect(selectToken(state)).toEqual(token);
});
