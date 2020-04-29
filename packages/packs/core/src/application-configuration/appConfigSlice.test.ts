import reducer, { setConfig, selectConfigLoaded, selectApiUrl } from './appConfigSlice';

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ loaded: false });
});

it('setConfig', () => {
	expect(reducer(undefined, setConfig({}))).toEqual({ loaded: true });
});

it('selectConfigLoaded', () => {
	const state = reducer(undefined, setConfig({}));
	const result = selectConfigLoaded(state);

	expect(result).toBeTruthy();
});

it('selectApiUrl', () => {
	const state = reducer(
		undefined,
		setConfig({
			environment: {
				apis: {
					default: {
						url: 'url',
					},
				},
			},
		}),
	);
	const result = selectApiUrl(state);

	expect(result).toBeTruthy();
});
